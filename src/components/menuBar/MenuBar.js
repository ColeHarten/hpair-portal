import { Box, AppBar, Toolbar } from '@mui/material';
import React from 'react';
import AccountMenu from "./AccountMenu";

export default function MenuBar({ user, onMenuButtonClick }) {
  return (
    <AppBar position="fixed" sx={{height: '64px'}}>
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <img src="/art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width={300} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountMenu user={user} onMenuButtonClick={onMenuButtonClick} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
