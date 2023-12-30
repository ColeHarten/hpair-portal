import { Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { User } from '../../../utils/types';
import AdminConferenceUserModal from './AdminConferenceUserModal';

interface Props {
  attendees: User[];
  searchQuery: string;
}

const AdminConferenceAttendeeTable: React.FC<Props> = ({ attendees,  searchQuery }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredAttendees = attendees
  .filter((attendee) => {
    const { displayName, email, uid } = attendee;
    const searchTerms = [displayName, email, uid].map((term) => term.toLowerCase());
    return searchTerms.some((term) => term.includes(searchQuery.toLowerCase()));
  })
  .slice() // Create a shallow copy of the array
  .sort((a, b) => {
    // Assuming paymentTime is a Date object
    const timeA = a.paymentTime?.getTime() ?? 0;
    const timeB = b.paymentTime?.getTime() ?? 0;

    return timeB - timeA ;
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
