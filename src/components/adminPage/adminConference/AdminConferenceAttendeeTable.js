import { Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';

export default function AdminConferenceAttendeeTable({ attendees, setOrderID, searchQuery }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const filteredAttendees = attendees.filter((attendee) => {
      const { displayName, email, id } = attendee;
      const searchTerms = [displayName, email, id].map((term) => term.toLowerCase());
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
              <TableRow key={attendee.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{attendee.displayName}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>{attendee.id}</TableCell>
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
  }