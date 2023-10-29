import { Button, Typography, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountMenu from "./AccountMenu";
import { styled } from '@mui/material/styles';

// Description: This component is the menu bar that is displayed at the top of the page.
//              It is used in the App component.
// Props: user, isSignedIn, onMenuButtonClick
//        user is the current user
//        isSignedIn is a boolean that determines whether the user is signed in or not
//        onMenuButtonClick is a function that is called when the menu button is clicked

export default function MenuBar({ user, isSignedIn, onMenuButtonClick }) {
  const CustomAppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
  }));

  return (
    <CustomAppBar position="fixed">
      <Toolbar>
        <Typography
          component={Link}
          to="https://www.hpair.org"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
          style={{ textDecoration: 'none' }}
        >
          HPAIR
        </Typography>
        {!isSignedIn ? (
          <>
            <Button component={Link} to="https://www.hpair.org" color="inherit" style={{ textDecoration: 'none' }}>
              Home
            </Button>
            <Button component={Link} to="https://www.hpair.org/about" color="inherit" style={{ textDecoration: 'none' }}>
              About Us
            </Button>
            <Button component={Link} to="https://www.hpair.org/about" color="inherit" style={{ textDecoration: 'none' }}>
              Board of Advisors
            </Button>
            <Button component={Link} to="https://www.hpair.org/apply" color="inherit" style={{ textDecoration: 'none' }}>
              Apply
            </Button>
          </>
        ) : (
          <AccountMenu user={user} onMenuButtonClick={onMenuButtonClick} />
        )}
      </Toolbar>
    </CustomAppBar>
  );
}
