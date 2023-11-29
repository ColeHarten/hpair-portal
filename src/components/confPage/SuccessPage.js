// ! This is the page that is rendered for events other than HCONF and ACONF. It is simpler and only shows some payment receipt information
// ! and various other success messaging
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUserData } from '../../utils/mutations';

export default function SuccessPage({ user }) {
    const [confCode, setConfCode] = useState(null);
    const [paymentID, setPaymentID] = useState(null);
    const [name, setName] = useState(null);
    const [isFree, setIsFree] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUserData(user);
            
            setConfCode(userData.conferenceCode);
            setPaymentID(userData.paymentID);
            setName(userData.displayName.split(" ")[0]);
            setIsFree(userData.ticketClass === "F");
        }
        fetchData();
    }, [user]);
    
    return (
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
            You have been succcessfully registered for the TAS Harvard Youth Leaders Conference. Your payment id is
            <strong><center>{paymentID}</center></strong>
            We will be sending out all further details via email soon. Thank You!
            </Typography>
        </Paper>
    </Box>
    );
}