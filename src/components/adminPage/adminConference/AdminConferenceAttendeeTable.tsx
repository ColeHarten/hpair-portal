import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import { User } from '../../../utils/types';

interface Props {
  attendees: User[];
  setOrderID: React.Dispatch<React.SetStateAction<string | null>>;
  searchQuery: string;
}

const AdminConferenceAttendeeTable: React.FC<Props> = ({ attendees, setOrderID, searchQuery }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredAttendees = attendees.filter((attendee) => {
    const { displayName, email, uid } = attendee;
    const searchTerms = [displayName, email, uid].map((term) => term.toLowerCase());
    return searchTerms.some((term) => term.includes(searchQuery.toLowerCase()));
  });

  const displayedAttendees = filteredAttendees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>UID</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedAttendees.map((attendee, index) => (
            <TableRow key={attendee.uid}>
              <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
              <TableCell>{attendee.displayName}</TableCell>
              <TableCell>{attendee.email}</TableCell>
              <TableCell>{attendee.uid}</TableCell>
              <TableCell>{attendee.ticketClass}</TableCell>
              <TableCell>{attendee.paymentID}</TableCell>
              <TableCell>
                <IconButton onClick={() => setOrderID(attendee.paymentID)}>
                  <LaunchIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[50, 100, 150]}
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
