import { Box, AppBar, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from "./AccountMenu";
import ExternalLink from './ExternalLink';

export default function MenuBar({ user, isSignedIn, isInConf, onMenuButtonClick }) {
  return (
    <AppBar position="fixed" sx={{height: '64px'}}>
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <ExternalLink component={Link} to="https://www.hpair.org">
          <img src="/art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width={300} />
        </ExternalLink>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isSignedIn ? (
            <>
            <ExternalLink component={Link} to="https://www.hpair.org" color="inherit" style={{ textDecoration: 'none' }}>
              Home
            </ExternalLink>
            <ExternalLink component={Link} to="https://www.hpair.org/about-us-1" color="inherit" style={{ textDecoration: 'none' }}>
              About Us
            </ExternalLink>
            <ExternalLink to="https://www.hpair.org/board-of-advisors">Board of Advisors</ExternalLink>  
            </>
        ) : 
          <AccountMenu user={user} onMenuButtonClick={onMenuButtonClick} />
        }
        </Box>
      </Toolbar>
    </AppBar>
  );
}
