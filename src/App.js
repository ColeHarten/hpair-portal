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
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Signed in as {currentUser.displayName}!
            </Typography>
            <Button
                variant='text'
                size='small'
                color='inherit'
                sx={{
                  marginTop: '5px',
                  marginBottom: '5px',
                }}
                onClick={() => {
                  firebase.auth().signOut()
                }}
            >
              Log out
            </Button>
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