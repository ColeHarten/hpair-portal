// Function to hold the mech store page
import { Box } from '@mui/material';
import StoreWidget from './StoreWidget';
import React from 'react';

export default function MerchStore({user}) {
    return (
        // add a margin to the top of the store of 64px to account for the menu bar
        <Box>
            <StoreWidget />
        </Box>
    )
}