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
import * as React from 'react';
import MENU_ITEMS from '../constants';

export default function AccountMenu({user, onMenuButtonClick}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {!user?.displayName ? 
              <Avatar sx={{ width: 32, height: 32 }}></Avatar> :
              <Avatar sx={{ width: 32, height: 32 }}>{user?.displayName.slice(0,1).toUpperCase()}</Avatar>
            }
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
        {/* add menu item for user name that does not change color on hover*/}
        <MenuItem sx={{color: 'black', fontWeight: 'bold'}}>{(user?.displayName?.length > 20) ? 
                                                            `${user?.displayName.slice(0, 20)}...`
                                                           :`${user?.displayName}`}
        </MenuItem>
        <MenuItem onClick={(event) => {
          handleClose();
          onMenuButtonClick(MENU_ITEMS.SUPPORT); // Pass the event to the callback
        }}>
          <ListItemIcon>
            <SupportAgentIcon />
          </ListItemIcon> Support
        </MenuItem>
        <MenuItem onClick={(event) => {
          handleClose();
          onMenuButtonClick(MENU_ITEMS.SETTINGS); // Pass the event to the callback
        }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={(event) => {
          handleClose();
          onMenuButtonClick(MENU_ITEMS.LOGOUT); // Pass the event to the callback
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
  
}
