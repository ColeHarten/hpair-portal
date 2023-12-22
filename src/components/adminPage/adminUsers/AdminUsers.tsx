import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { subscribeToUsers } from '../../../utils/mutations';
import MenuBar from '../adminMenuBar/AdminMenuBar';
import AdminUsersTable from './AdminUsersTable';
import { User } from '../../../utils/types';


export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const unsubscribe = subscribeToUsers((data : User[]) => {
      setUsers(data);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Box>
      <MenuBar />
      <Box sx={{ marginTop: '64px', p: '10px' }}>
        <Typography variant="h4">Users</Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AdminUsersTable users={users} searchQuery={searchQuery} />
      </Box>
    </Box>
  );
}
