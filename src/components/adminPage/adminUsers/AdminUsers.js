import { Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { subscribeToUsers } from '../../../utils/mutations';
import MenuBar from '../adminMenuBar/AdminMenuBar';
import AttendeeTable from './AdminUsersTable';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    subscribeToUsers((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <Box>
      <MenuBar />
      <Box sx={{ marginTop: '64px', p:'10px' }}>
        <Typography variant="h4">Users</Typography>
        <TextField
            label="Search"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AttendeeTable users={users} searchQuery={searchQuery} />
      </Box>
    </Box>
  );
}
