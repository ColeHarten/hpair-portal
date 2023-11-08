import { Box, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from "./AccountMenu";
import ExternalLink from './ExternalLink';

export default function MenuBar({ user, isSignedIn, isInConf, onMenuButtonClick }) {
  const CustomAppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
  }));

  return (
    <CustomAppBar position="fixed">
      <Toolbar>
        <Box display="flex" sx={{justifyContent: 'space-between'}}>
            <ExternalLink component={Link} to="https://www.hpair.org">
              <img src="/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width={300} />
            </ExternalLink>
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
    </CustomAppBar>
  );
}
