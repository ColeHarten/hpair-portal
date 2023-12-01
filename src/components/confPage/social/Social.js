import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Social(user){
    return(
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Align items in the center horizontally
            justifyContent: 'center', // Center content vertically
            padding: '20px',
        }}
    >
        <Typography variant="h4">Connect with other delegates!</Typography>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Arrange items in a column
                alignItems: 'center', // Align items in the center horizontally
                padding: '20px',
            }}
        >
            <a href="https://www.linkedin.com/groups/12935124/">
                <img src="/art/linkedin.png" width="50px" alt="LinkedIn Icon" />
            </a>
        </Box>
    </Box>
    )
}