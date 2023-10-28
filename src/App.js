import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import firebase from 'firebase/compat/app';
import './App.css';
import JoinConf from './components/Pages/JoinConf';
import { getUserData } from "./utils/mutations";
import AccountMenu from "./components/AccountMenu";
import SignInScreen from './components/Pages/SignInScreen';
import MENU_ITEMS from './constants'
import ConfPage from './components/Pages/ConfPage';


const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}));

const mdTheme = createTheme({
  palette: {
    primary: {
      main: '#A51C30', // A blue primary color
    },
    secondary: {
      main: '#000000', // A pink secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Use the Roboto font family
    h5: {
      fontSize: '1.5rem', // Customize the font size for h5 typography
    },
  },
  shape: {
    borderRadius: 10, // Adjust the global border radius
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none', // Disable uppercase text transform for buttons
      },
    },
    MuiTextField: {
      root: {
        marginBottom: '16px', // Add margin between text fields
      },
    },
    MuiLink: {
      root: {
        textDecoration: 'none', // Remove underline from links
        color: '#1976D2', // Customize link color
      },
    },
  },
});


export default function App() {
  // User authentication functionality.
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  const [conferenceID, setConferenceID] = React.useState(null);

  const navigate = useNavigate();

  // Listen to the Firebase Auth state and set the local state.
  // This is called on sign in and sign out.
  // If the user is already in a conference, redirect them to the conference page
  React.useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      setIsSignedIn(!!user);
      if (user) {
        setCurrentUser(user);
        const data = await getUserData(user);
        if (data?.conferenceCode) {
          const conferenceCode = data.conferenceCode.slice(0, 6);
          setConferenceID(conferenceCode);
          navigate(`/conference/${conferenceCode}`);
        }
      } else {
        setCurrentUser(null);
        setConferenceID(null);
        navigate('/signin');
      }
    });
    return () => unregisterAuthObserver();
  }, [navigate]);



  const handleMenuButtonClick = (buttonCode) => {
    // Handle button clicks within the menu here
    switch(buttonCode) {
      case MENU_ITEMS.SETTINGS:
        console.log("Settings clicked");
        break;
      case MENU_ITEMS.LOGOUT:
        firebase.auth().signOut();
        navigate('/signin')
        break;
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
        <AppBar position="fixed">
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
            ) : !conferenceID ? (
              <AccountMenu user={currentUser} onMenuButtonClick={handleMenuButtonClick} />
            ) : (
              <AccountMenu user={currentUser} onMenuButtonClick={handleMenuButtonClick} />
            )}
          </Toolbar>
        </AppBar>
        <Box sx={{ marginTop: '64px' }}>
          <Routes>
            <Route path="/signin" element={!isSignedIn ? <SignInScreen /> : <Navigate to="/join-conference" />} />
            <Route path="/join-conference" element={isSignedIn && !conferenceID ? <JoinConf user={currentUser} navigate={navigate} /> : <Navigate to={`/conference/${conferenceID}`} />} />
            <Route path="/conference/:confID" element={isSignedIn && !!conferenceID ? <ConfPage user={currentUser}/> : <Navigate to="/join-conference" />} />
            <Route path="/" element={<Navigate to="/signin" />} />
          </Routes>
        </Box>
    </ThemeProvider>
  );
}