// ! This is the page that is rendered for events other than HCONF and ACONF. It is simpler and only shows some payment receipt information
// ! and various other success messaging
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConferenceData, getUserData } from '../../utils/mutations';

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
            <img src="/art/HPAIR Logo Banner (Black).png" alt="HPAIR Logo" width={300} />
            <Typography variant="body" sx={{textAlign: 'left', margin: '10px 0'}} component="span">
            Success! Thank you, {name}. 
            Your payment has been processed and you have been successfully registered for the {confCode} conference.
            {!isFree && 
            (<>
                Your payment id is:
            <strong><center>{paymentID}</center></strong>
            </>)}
             If you have any questions, please reach out to <a href="mailto:help@hpair.org"> help@hpair.org</a>
            </Typography>
        </Paper>
    </Box>
    );
}