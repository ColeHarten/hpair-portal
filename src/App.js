import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// import firebase from 'firebase/compat/app';
import { useEffect } from 'react';
import './App.css';
import MenuBar from './components/MenuBar';
import SupportModal from './components/SupportModal';
import MENU_ITEMS from './constants';
import ConfPage from './Pages/ConfPage';
import JoinConf from './Pages/JoinConf';
import SettingsPage from './Pages/Settings';
import SignInScreen from './Pages/SignInScreen';
import { auth } from './utils/firebase';
import { getUserData, syncUsers } from "./utils/mutations";

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
  const [currentUser, setCurrentUser] = React.useState(null);
  const [conferenceID, setConferenceID] = React.useState(null);
  const [supportOpen, setSupportOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  // Listen to the Firebase Auth state and set the local state.
  // This is called on sign in and sign out.
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      setIsLoading(true);
      if (user) {
        if(user.displayName)
        {
          await syncUsers(user);
        }
        setCurrentUser(user);
        const data = await getUserData(user);
        if (data?.conferenceCode) {
          const conferenceCode = data.conferenceCode.slice(0, 6);
          setConferenceID(conferenceCode);
          // Redirect to the conference page upon successful sign-up
          // navigate(`/conference/${conferenceCode}`);
        } else {
          // Redirect to the join-conference page upon successful sign-up
          navigate('/join-conference'); 
        }
      } else {
        setCurrentUser(null);
        setConferenceID(null);
        navigate('/signin');
      }
      setIsLoading(false);
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
        navigate('/settings');
        break;
      case MENU_ITEMS.LOGOUT:
        auth.signOut();
        navigate('/signin')
        break;
      default:
        break;
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <MenuBar user={currentUser} onMenuButtonClick={handleMenuButtonClick} isSignedIn={!!currentUser} />
      <Box sx={{ marginTop: '64px' }}>
        <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
        {isLoading ? <Typography>Loading...</Typography> : (
          <Routes>
            <Route path="/signin" element={!currentUser ? <SignInScreen /> : <Navigate to="/join-conference" />} />
            <Route path="/join-conference" element={currentUser ? (!conferenceID ? <JoinConf user={currentUser} /> : <Navigate to={`/conference/${conferenceID}`} />) : <Navigate to="/signin" />} />
            <Route
              path="/conference/:confID"
              element={currentUser && conferenceID ? <ConfPage user={currentUser} /> : <Navigate to="/join-conference" />}
            />
            {/* <Route path="/settings" element={currentUser ? <SettingsPage user={currentUser} navigate={navigate}/> : <Navigate to="/signin" />} /> */}
            <Route exact index element={<Navigate to="/signin" />} />
          </Routes>
        )}
      </Box>
    </ThemeProvider>
  );
}