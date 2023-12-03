import { Box, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';

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
                flexDirection: 'row', // Arrange items in a column
                alignItems: 'center', // Align items in the center horizontally
                padding: '20px',
                gap: 5,
                justifyContent: 'space-between', // Center content vertically
            }}
        >
            <a href="https://www.linkedin.com/groups/12935124/" target="_blank">
                <img src="/art/linkedin.png" width="50px" alt="LinkedIn Icon"  />
            </a>
            <a href="https://www.instagram.com/officialhpair/?hl=en" target="_blank">
                <img src="/art/instagram.jpg" width="50px" alt="Instagram Icon" />
            </a>
            <a href="https://www.facebook.com/official.hpair/" target="_blank">
                <img src="/art/facebook.png" width="50px" alt="Facebook Icon" />
            </a>
        </Box>
    </Box>
    )
}