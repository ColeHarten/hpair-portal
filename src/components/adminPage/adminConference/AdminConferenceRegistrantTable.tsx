import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect, useState } from 'react';
import { User } from '../../../utils/types';
import AdminConferenceUserModal from './AdminConferenceUserModal';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

interface Props {
  registrants: User[];
}

const AdminConferenceregistrantTable: React.FC<Props> = ({ registrants }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTicketClass, setFilterTicketClass] = useState<string>('');
  const [uniqueTicketClasses, setUniqueTicketClasses] = useState<string[]>([]);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  useEffect(() => {
    // Extract unique ticket classes from registrants
    const uniqueClasses = new Set(registrants.map((registrant) => registrant.ticketClass));
    setUniqueTicketClasses(Array.from(uniqueClasses) as string[]);
  }, [registrants]);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredregistrants = registrants
    .filter((registrant) => {
      const { displayName, email, uid, ticketClass } = registrant;
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

  const displayedregistrants = filteredregistrants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  /**
   * Downloads a CSV file containing registrant information.
   * Registrant information includes displayName, email, uid, ticketClass, and paymentTime.
   * If paymentTime is not available, an empty string is used.
   * The downloaded file is named 'registrants.csv'.
  */
  const handleDownload = async () => {
    // Add column names as the first row
    const columnNames = 'DisplayName,Email,UID,TicketClass,PaymentTime';
    
    // Map the registrants data to CSV format
    const csvData = registrants.map((registrant) => {
      const { displayName, email, uid, ticketClass } = registrant;
      return `${displayName},${email},${uid},${ticketClass},${registrant.paymentTime?.getTime() ?? ''}`;
    });
  
    // Combine column names and registrants data
    const csvString = `${columnNames}\n${csvData.join('\n')}`;
    
    // Create a Blob with the CSV data
    const blob = new Blob([csvString], { type: 'text/csv' });
  
    // Create a download URL for the Blob
    const url = window.URL.createObjectURL(blob);
  
    // Create an anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrants.csv';
  
    // Append the anchor element to the document
    document.body.appendChild(a);
  
    // Programmatically trigger a click on the anchor element
    a.click();
  
    // Remove the anchor element from the document
    document.body.removeChild(a);
  
    setDownloaded(true);
  }
  
  
  return (
  <Box sx={{ width: '100%', overflow: 'auto', marginBottom: '20px' }}>

  <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
  <Box sx={{display: "flex", gap:'20px'}}>
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Typography variant="body2">Search for user</Typography>
      <TextField
        variant="outlined"
        size="small"
        placeholder='Search'
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
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth:'200px', marginRight: 'auto' }}>
      <Typography variant="body2">Filter by class</Typography>
      <Select
        id="ticket-class-filter"
        value={filterTicketClass}
        onChange={(e) => setFilterTicketClass(e.target.value as string)}
        size='small'
        displayEmpty
      >
        <MenuItem value="">All</MenuItem>
        {uniqueTicketClasses.map((ticketClass) => (
          <MenuItem key={ticketClass} value={ticketClass}>
            {ticketClass}
          </MenuItem>
        ))}
      </Select>
    </Box>
  </Box>

  <Button
    variant="text"
    startIcon={downloaded ? <FileDownloadDoneIcon /> : <DownloadIcon />}
    onClick={handleDownload}
    sx={{ color: 'black' }}
  >
    Download
  </Button>
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
      <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333', padding: '8px', height: '40px' }}>#</TableCell>
      <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333', padding: '8px', height: '40px' }}>Name</TableCell>
      <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333', padding: '8px', height: '40px' }}>Date</TableCell>
      <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333', padding: '8px', height: '40px' }}>Email</TableCell>
      <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333', padding: '8px', height: '40px' }}>Class</TableCell>
      <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333', padding: '8px', height: '40px' }}></TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {displayedregistrants.map((registrant, index) => (
      <TableRow key={registrant.uid} sx={{ height: '40px' }}>
        <TableCell sx={{ padding: '8px' }}>{index + 1 + page * rowsPerPage}</TableCell>
        <TableCell sx={{ padding: '8px' }}>{registrant.displayName}</TableCell>
        <TableCell sx={{ padding: '8px' }}>
          {registrant.paymentTime?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }) ?? ''}
        </TableCell>
        <TableCell sx={{ padding: '8px' }}>{registrant.email}</TableCell>
        <TableCell sx={{ padding: '8px' }}>{registrant.ticketClass}</TableCell>
        <TableCell sx={{ padding: '8px' }}>
          <AdminConferenceUserModal user={registrant} />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

    <TablePagination
      rowsPerPageOptions={[25, 50, 100]}
      component="div"
      count={filteredregistrants.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Box>
  );
};

export default AdminConferenceregistrantTable;
