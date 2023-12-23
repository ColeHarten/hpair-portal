import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import QRCode from 'qrcode.react';

import type { User } from '../../../utils/types';
import MenuBar from '../menuBar/MenuBar';

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [name, setName] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [uid, setUid] = useState<string | undefined>('');

  useEffect(() => {
    setName(user?.displayName);
    setEmail(user?.email);
    setUid(user?.uid);
  }, [user]);

  return (
    <>
    <MenuBar user={user} />
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        marginTop: '64px',
      }}
    >
      <Paper
        sx={{
          width: '30%',
          minWidth: '350px',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body1">{email}</Typography>
          {uid && <QRCode value={uid} size={200} />}
        </Box>
      </Paper>
    </Box>
    </>
  );
};

export default Profile;
