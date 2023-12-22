import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, useMediaQuery, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function MenuBar({ }) {
  const navigate = useNavigate();
  const { confCode } = useParams();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleMobileMenuClick = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(`/${confCode}/${path}`);
    handleMobileMenuClose();
  };

  // TODO: Make this a banner
  // useEffect(() => {
  //   alert("Note: You are acting as a superadmin with complete priviledge over the database. Changes can result in potentially fatal consequences for the portal!")
  // }, [])

  return (
    <AppBar position="fixed" sx={{ height: '64px', zIndex: 1 }}>
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        {isSmallScreen ? (
          <>
          <IconButton color="inherit" onClick={handleMobileMenuClick}>
            <MenuIcon />
          </IconButton>
          <Button onClick={() => { navigate(`/ADMIN`); }}>
            <img src="/art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width={300} />
          </Button>
          </>
        ) : (<>
        <Button onClick={() => { navigate(`/ADMIN`); }}>
          <img src="/art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width={300} />
        </Button>
        <Box sx={{display: 'flex', gap: '10px'}}>
          <Button color="inherit" style={{ textDecoration: 'none' }} onClick={() => { navigate(`/ADMIN/users`); }}>Users</Button>
        </Box>
        </>)}
      </Toolbar>

      {/* Mobile menu */}
      {mobileMenuAnchor && (
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('users')}>Users</MenuItem>  
        </Menu>
      )}
    </AppBar>
  );
}
