import { Box, AppBar, Toolbar, Button } from '@mui/material';
import React from 'react';
import AccountMenu from "./AccountMenu";
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export default function MenuBar({ user, onButtonClick }) {
  const navigate = useNavigate();
  const {confCode} = useParams();

  return (
    <AppBar position="fixed" sx={{height: '64px'}}>
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={()=>{navigate(`/${confCode}`)}}>
          <img src="/art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width={300} />
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" style={{ textDecoration: 'none' }} onClick={()=>{navigate(`/${confCode}/store`)}}>Store</Button>
          <AccountMenu user={user} onMenuButtonClick={onButtonClick} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
