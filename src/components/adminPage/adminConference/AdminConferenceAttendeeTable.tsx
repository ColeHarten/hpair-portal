import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import AdminConferenceUserModal from './AdminConferenceUserModal';
import { User } from '../../../utils/types';

interface Props {
  attendees: User[];
}

const AdminConferenceAttendeeTable: React.FC<Props> = ({ attendees }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTicketClass, setFilterTicketClass] = useState<string | null>('');

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredAttendees = attendees
    .filter((attendee) => {
      const { displayName, email, uid, ticketClass } = attendee;
      const searchTerms = [displayName, email, uid, ticketClass].map((term) => term?.toLowerCase());
      return (
        searchTerms.some((term) => term?.includes(searchQuery.toLowerCase())) &&
        (!filterTicketClass || ticketClass === filterTicketClass)
      );
    })
    .slice()
    .sort((a, b) => {
      const timeA = a.paymentTime?.getTime() ?? 0;
      const timeB = b.paymentTime?.getTime() ?? 0;

      return timeB - timeA;
    });

  const displayedAttendees = filteredAttendees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%', overflow: 'auto', marginBottom: '20px' }}>
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          margin="normal"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" size="small">
          <InputLabel id="ticket-class-filter-label">Filter by Ticket Class</InputLabel>
          <Select
            labelId="ticket-class-filter-label"
            id="ticket-class-filter"
            value={filterTicketClass || ''}
            onChange={(e) => setFilterTicketClass(e.target.value as string)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="E">Class A</MenuItem>
            <MenuItem value="R">Class B</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Table
        sx={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginTop: '16px',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }}>#</TableCell>
            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }}>Name</TableCell>
            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }}>Date</TableCell>
            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }}>Email</TableCell>
            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }}>Class</TableCell>
            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedAttendees.map((attendee, index) => (
            <TableRow key={attendee.uid}>
              <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
              <TableCell>{attendee.displayName}</TableCell>
              <TableCell>
                {attendee.paymentTime?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }) ?? ''}
              </TableCell>
              <TableCell>{attendee.email}</TableCell>
              <TableCell>{attendee.ticketClass}</TableCell>
              <TableCell>
                <AdminConferenceUserModal user={attendee} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={filteredAttendees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default AdminConferenceAttendeeTable;
