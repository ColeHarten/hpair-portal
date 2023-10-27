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
import JoinConf from './Pages/JoinConf';
import { getUserData } from "./utils/mutations";
import AccountMenu from "./components/AccountMenu";
import SignInScreen from './Pages/SignInScreen';
import MENU_ITEMS from './constants'
import ConfPage from './Pages/ConfPage';
import { addConferenceCode } from "./utils/mutations";
import {sha1} from 'crypto-hash';


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

  // validate conference codes
  const validateConferenceCode = async (conferenceCode, email) => {
    // check if conference code is valid
    let result = await sha1(email);
    // if the user input matches the last 6 characters of the sha1 hash of their email
    // then it is valid
    console.log(result.slice(-6))

    // This is not deterministic but the probability of collision is ~1/(16^6)
    // ! WE MAY WANT TO CHECK THAT THIS IS NOT VISIBLE TO USER
    return (result.slice(-6) === conferenceCode.slice(-6)) && 
            conferenceCode.slice(0, 6) === "CONF24";
  }

  // on submit click
  const handleJoinConf = async (conferenceCode) => {
    // add conference code to user doc
    let isValid = await validateConferenceCode(conferenceCode, currentUser.email)
    if(isValid){
      // add conference code to user doc
      addConferenceCode(currentUser, conferenceCode);
      // redirect to the conference page
      setConferenceID(conferenceCode);
    } else{
      alert("Invalid Conference Code. Please verify code entered and remember that you must use the same email you used to register for the conference. If you are still having issues, please reach out to conference support.")
    }
  }

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
        navigate('/signin')
        break;
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
        <AppBar position="fixed"> {/* Use "fixed" for a fixed app bar */}
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
              <AccountMenu user={currentUser} onMenuButtonClick={handleMenuButtonClick} />
            )}
          </Toolbar>
        </AppBar>
        <Box sx={{ marginTop: '64px' }}>
          <Routes>
            <Route path="/signin" element={!isSignedIn ? <SignInScreen /> : <Navigate to="/join-conference" />} />
            <Route path="/join-conference" element={isSignedIn && !conferenceID ? <JoinConf handleJoinConf={handleJoinConf} /> : <Navigate to={`/conference/${conferenceID}`} />} />
            <Route path="/conference/:confID" element={isSignedIn && !!conferenceID ? <ConfPage user={currentUser}/> : <Navigate to="/join-conference" />} />
            <Route path="/" element={<Navigate to="/signin" />} />
          </Routes>
        </Box>
    </ThemeProvider>
  );
}