import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React from "react";
// import firebase from 'firebase/compat/app';
import './App.css';
import JoinConf from './Pages/JoinConf';
import { getUserData } from "./utils/mutations";
import MenuBar from './components/MenuBar';
import SignInScreen from './Pages/SignInScreen';
import MENU_ITEMS from './constants'
import ConfPage from './Pages/ConfPage';
import SupportModal from './components/SupportModal';
import { auth } from './utils/firebase';

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

  const [supportOpen, setSupportOpen] = React.useState(false);

  const navigate = useNavigate();

  // Listen to the Firebase Auth state and set the local state.
  // This is called on sign in and sign out.
  // If the user is already in a conference, redirect them to the conference page
  React.useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
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
      case MENU_ITEMS.SUPPORT:
        setSupportOpen(true);
        break;
      case MENU_ITEMS.SETTINGS:
        console.log("Settings clicked");
        break;
      case MENU_ITEMS.LOGOUT:
        auth.signOut();
        navigate('/signin')
        break;
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
        <MenuBar user={currentUser} onMenuButtonClick={handleMenuButtonClick} isSignedIn={isSignedIn}/>
        <Box sx={{ marginTop: '64px' }}>
          <SupportModal open={supportOpen} onClose={()=>{setSupportOpen(false)}} />
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