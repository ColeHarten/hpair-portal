import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import MenuBar from '../menuBar/AdminMenuBar';

export default function AdminUsers({}){
    return (
    <Box>
        <MenuBar />
        <Box sx={{marginTop: '64px'}}>
            <Typography>Users</Typography>
        </Box>
    </Box>
    )
}