import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';
import { User } from '../../../utils/types';

interface AdminUsersTableProps {
  users: User[];
  searchQuery: string;
}

export default function AdminUsersTable({ users, searchQuery }: AdminUsersTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter((user) => {
    const { displayName, email, uid } = user;
    const searchTerms = [displayName, email, uid].map((term) => term.toLowerCase());
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
            <TableRow key={user?.uid}>
              <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
              <TableCell>{user?.displayName}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.uid}</TableCell>
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
