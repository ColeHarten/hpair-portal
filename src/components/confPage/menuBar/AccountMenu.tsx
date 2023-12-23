import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';

import type { User } from '../../../utils/types';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../utils/firebase';

interface AccountMenuProps {
  user: User | null;
  confCode : string | null;
  supportOpen: (open: boolean) => void;
}

export default function AccountMenu({ user, confCode, supportOpen }: AccountMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleOpen}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {!user?.displayName ? (
              <Avatar sx={{ width: 32, height: 32 }}></Avatar>
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>{user.displayName.slice(0, 1).toUpperCase()}</Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          sx={{ color: 'black', fontWeight: 'bold' }}
          onClick={() => navigate(`/${confCode}/profile`)}
        >
          {user && user?.displayName?.length > 20 ? `${user.displayName.slice(0, 20)}...` : `${user?.displayName}`}
        </MenuItem>
        <MenuItem onClick={() => supportOpen(true)}>
          <ListItemIcon><SupportAgentIcon /></ListItemIcon>{' '}
          Support
        </MenuItem>
        <MenuItem onClick={() => navigate(`/${confCode}/settings`)}>
          <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => auth.signOut()}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
