import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { getUserData } from '../utils/mutations';
import type { User } from '../utils/types';

interface SuccessPageProps {
  user: User | null;
}

export default function SuccessPage({ user }: SuccessPageProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentID, setPaymentID] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if(!user) throw new Error("User is null");
      const userData = await getUserData(user.uid);
      setPaymentID(userData?.paymentID);
    };

    fetchData();
    setLoading(false);
  }, [user]);

  return (
    loading ? (
      <Typography>Loading...</Typography>
    ) : (
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column', // Stack contents vertically
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
        }}
      >
        <Paper
          sx={{
            width: '30%',      // Take up 1/3 of the width
            minWidth: '350px', // But at least 300px
            p: 2,              // Add some padding
            display: 'flex',   // Use Flexbox to center content
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <a href="https://www.hpair.org"><img src="/art/HPAIR Logo Banner (Black).png" alt="HPAIR Logo" width={300} /></a>
          <Typography variant="body1" sx={{ textAlign: 'left', margin: '10px 0' }} component="span">
            You have been successfully registered for the Harvard Youth Leadership Conference. Your payment id is{' '}
            <Typography variant="body1" component="strong" sx={{ display: 'block', textAlign: 'center' }}
              >{paymentID}
            </Typography>
            We will be sending out all further details via email soon. Thank you!
          </Typography>
        </Paper>
      </Box>
    )
  );
}
