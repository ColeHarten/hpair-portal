import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Social() {

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
                flexDirection: 'row', // Arrange items in a column
                alignItems: 'center', // Align items in the center horizontally
                padding: '20px',
                gap: 5,
                justifyContent: 'space-between', // Center content vertically
            }}
        >
            <a href="https://www.linkedin.com/groups/12935124/" rel="noreferrer" target="_blank">
                <img src="/art/linkedin.png" width="50px" alt="LinkedIn Icon"  />
            </a>
            <a href="https://www.instagram.com/officialhpair/?hl=en" rel="noreferrer" target="_blank">
                <img src="/art/instagram.png" width="50px" alt="Instagram Icon" />
            </a>
            <a href="https://www.facebook.com/official.hpair/" rel="noreferrer" target="_blank">
                <img src="/art/facebook.png" width="50px" alt="Facebook Icon" />
            </a>
        </Box>
    </Box>
    )
}