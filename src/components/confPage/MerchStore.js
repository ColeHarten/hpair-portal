// Function to hold the mech store page
import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material';
import StoreWidget from './StoreWidget';
import React from 'react';

export default function MerchStore({user}) {
    return (
        <Box>
            <StoreWidget />
        </Box>
    )
}