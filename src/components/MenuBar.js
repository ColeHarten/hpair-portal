import { Typography, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountMenu from "./AccountMenu";
import { styled } from '@mui/material/styles';
import ExternalLink from './ExternalLink';


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
