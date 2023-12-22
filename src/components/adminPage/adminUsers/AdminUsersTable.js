import { Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useState } from 'react';

export default function AdminUsersTable({ users, searchQuery }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const filteredUsers = users.filter((user) => {
      const { displayName, email, id } = user;
      const searchTerms = [displayName, email, id].map((term) => term.toLowerCase());
      return searchTerms.some((term) => term.includes(searchQuery.toLowerCase()));
    });
  
    const displayedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
    return (
      <Box sx={{ width: '100%', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>UID</TableCell>
              <TableCell>Conference</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user, index) => (
              <TableRow key={user?.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{user?.displayName}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.id}</TableCell>
                <TableCell>{user?.conferenceCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[50, 100, 150]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    );
  }