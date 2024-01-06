import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAccountMenu from './AdminAccountMenu';

const menuItems = [
  { name: 'Users', path: 'users' },
];

export default function MenuBar() {
  const navigate = useNavigate();
  const { confCode } = useParams();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMobileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(`/${confCode}/${path}`);
    handleMobileMenuClose();
  };

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
        ) : (
          <>
            <Button onClick={() => { navigate(`/ADMIN`); }}>
              <img src="/art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width={300} />
            </Button>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {menuItems.map((menuItem) => (
                <Button
                  key={menuItem.path}
                  color="inherit"
                  style={{ textDecoration: 'none' }}
                  onClick={() => { navigate(`/ADMIN/${menuItem.path}`); }}
                >
                  {menuItem.name}
                </Button>
              ))}
              <AdminAccountMenu />
            </Box>
          </>
        )}
      </Toolbar>

      {/* Mobile menu */}
      {mobileMenuAnchor && (
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
        >
          {menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.path}
              onClick={() => handleMenuItemClick(menuItem.path)}
            >
              {menuItem.name}
            </MenuItem>
          ))}
        </Menu>
      )}
    </AppBar>
  );
}
