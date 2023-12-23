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
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AccountMenu from './AccountMenu';

import type { User } from '../../../utils/types';

interface MenuBarProps {
  user: User;
  onMenuButtonClick: (code: number) => void;
}

export default function MenuBar({ user, onMenuButtonClick }: MenuBarProps) {
  const navigate = useNavigate();
  const { confCode } = useParams();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

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
            <Button onClick={() => navigate(`/${confCode}`)}>
              <img src="/art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width={300} />
            </Button>
            <AccountMenu user={user} onMenuButtonClick={onMenuButtonClick} />
          </>
        ) : (
          <>
            <Button onClick={() => navigate(`/${confCode}`)}>
              <img src="/art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width={300} />
            </Button>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Button color="inherit" onClick={() => navigate(`/${confCode}/faqs`)}>
                FAQs
              </Button>
              <Button color="inherit" onClick={() => navigate(`/${confCode}/social`)}>
                Social
              </Button>
              <Button color="inherit" onClick={() => navigate(`/${confCode}/store`)}>
                Store
              </Button>
              <AccountMenu user={user} onMenuButtonClick={onMenuButtonClick} />
            </Box>
          </>
        )}
      </Toolbar>

      {/* Mobile menu */}
      {mobileMenuAnchor && (
        <Menu anchorEl={mobileMenuAnchor} open={Boolean(mobileMenuAnchor)} onClose={handleMobileMenuClose}>
          <MenuItem onClick={() => handleMenuItemClick('faqs')}>FAQs</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('social')}>Social</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('store')}>Store</MenuItem>
          {/* Add more menu items as needed */}
        </Menu>
      )}
    </AppBar>
  );
}
