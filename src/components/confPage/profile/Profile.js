import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import QRCode from 'qrcode.react'; // Import the QRCode component

export default function Profile({ user }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [uid, setUid] = useState('');

    useEffect(() => {
        setName(user?.displayName);
        setEmail(user?.email);
        setUid(user?.uid);
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
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                        justifyContent: 'flex-start', // Align content at the top
                    }}
                >
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="body1">{email}</Typography>
                    <QRCode value={uid} size={200} />
                </Box>
            </Paper>
        </Box>
    );
}
