// ! This is the page that is rendered for events other than HCONF and ACONF. It is simpler and only shows some payment receipt information
// ! and various other success messaging
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUserData } from '../utils/mutations';

export default function SuccessPage({ user }) {
    const [loading, setLoading] = useState(true);
    const [paymentID, setPaymentID] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUserData(user);
            setPaymentID(userData?.paymentID);
        }
        fetchData();
        setLoading(false);
    }, [user]);
    
    return (
    loading ? <Typography>Loading...</Typography> : (
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
            minHeight: "100vh",
          }}>
            <a href="https://www.hpair.org"><img src="/art/HPAIR Logo Banner (Black).png" alt="HPAIR Logo" width={300} /></a>
            <Typography variant="body" sx={{textAlign: 'left', margin: '10px 0'}} component="span">
            You have been succcessfully registered for the Harvard Youth Leaders Conference. Your payment id is
            <strong><center>{paymentID}</center></strong>
            We will be sending out all further details via email soon. Thank you!
            </Typography>
        </Paper>
    </Box>)
    );
}