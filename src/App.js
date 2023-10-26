import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, BrowserRouter as Router, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import React from "react";
import firebase from 'firebase/compat/app';
import { SignInScreen } from './utils/firebase';
import './App.css';
import Home from "./Routes/Home";
import { syncUsers } from "./utils/mutations";
import AccountMenu from "./components/AccountMenu";
import MENU_ITEMS from './constants'


const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}));

const mdTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#A51C30',
    },
  },
});


export default function App() {
  // User authentication functionality.
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  // Listen to the Firebase Auth state and set the local state.
  React.useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      if (!!user) {
        setCurrentUser(user);
        syncUsers(user);
      }
    });
    return () => unregisterAuthObserver();
    // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  
  const handleMenuButtonClick = (buttonCode) => {
    // Handle button clicks within the menu here
    switch(buttonCode) {
      case MENU_ITEMS.PROFILE:
        console.log("Profile clicked");
        break;
      case MENU_ITEMS.ACCOUNT:
        console.log("Account clicked");
        break;
      case MENU_ITEMS.SETTINGS:
        console.log("Settings clicked");
        break;
      case MENU_ITEMS.LOGOUT:
        firebase.auth().signOut();
        break;
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Router>
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
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
            {!isSignedIn ? <> 
            <Button component={Link} to="https://www.hpair.org" color="inherit" style={{ textDecoration: 'none' }}>Home</Button>
            <Button component={Link} to="/about" color="inherit" style={{ textDecoration: 'none' }}>About Us</Button>
            <Button component={Link} to="/about" color="inherit" style={{ textDecoration: 'none' }}>Board of Advisors</Button>
            <Button component={Link} to="/apply" color="inherit" style={{ textDecoration: 'none' }}>Apply</Button>
              </> : <>
            <AccountMenu user={currentUser} onMenuButtonClick={handleMenuButtonClick}/>
            </>}

          </Toolbar>
        </AppBar>
        {isSignedIn ?
        (<Routes>
          <Route path="/" element={<Home user={currentUser} />} />
        </Routes>) : (<SignInScreen />)}
      </Router>
    </Box>
  </ThemeProvider>);
}