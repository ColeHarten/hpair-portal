import { Button, Typography, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountMenu from "./AccountMenu";
import { styled } from '@mui/material/styles';

function ExternalLink({ to, children }) {
  const handleLinkClick = () => {
    const confirmed = window.confirm('You are about to leave this page. Do you want to continue?');
    if (confirmed) {
      window.location.href = to;
    }
  };

  return (
    <Button color="inherit" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
      {children}
    </Button>
  );
}

export default function MenuBar({ user, isSignedIn, isInConf, onMenuButtonClick }) {
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
      </Toolbar>
    </CustomAppBar>
  );
}
