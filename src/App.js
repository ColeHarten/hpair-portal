import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect } from "react";
import './App.css';
import MenuBar from './components/MenuBar';
import SupportModal from './components/SupportModal';
import MENU_ITEMS from './constants';
import ConfPage from './Pages/ConfPage';
import JoinConf from './Pages/JoinConf';
import SettingsPage from './Pages/Settings';
import SignInScreen from './Pages/SignInScreen';
import { auth } from './utils/firebase';
import { getUserData } from "./utils/mutations";

const mdTheme = createTheme({
  palette: {
    primary: {
      main: '#A51C30', // A crimson primary color
    },
    secondary: {
      main: '#000000', // A white secondary color
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

  // Pages:
  // 0: SignInScreen
  // 1: JoinConf/Payment
  // 2: ConfPage
  // 3: SettingsPage
  const [currentPage, setCurrentPage] = React.useState(0);


  // Listen to the Firebase Auth state and set the local state.
  // This is called on sign in and sign out.
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      setIsLoading(true);
      if (user) {
        setCurrentUser(user);
        const data = await getUserData(user);
        if (data?.conferenceCode) {
          const conferenceCode = data.conferenceCode.slice(0, 6);
          setConferenceID(conferenceCode);
        } 
      } else {
        setCurrentUser(null);
        setConferenceID(null);
      }
      setIsLoading(false);
    });
    return () => unregisterAuthObserver();
  }, []);
  
  // useEffect to control which page is displayed
  useEffect(() => {
    if(!currentUser) {
      // if we are not signed in, go to sign in page
      setCurrentPage(0);
    } else if(currentPage === 3){ 
      // if we are on the settings page, don't change the page
      setCurrentPage(3);
    } else if (!conferenceID) { 
      // if we don't have a conference ID, go to join conference
      setCurrentPage(1);
    } else {
      // otherwise, go to the conference page
      setCurrentPage(2);
    }
  }, [currentUser, conferenceID]);

  const handleMenuButtonClick = (buttonCode) => {
    // Handle button clicks within the menu here
    switch(buttonCode) {
      case MENU_ITEMS.SUPPORT:
        setSupportOpen(true);
        break;
      case MENU_ITEMS.SETTINGS:
        setCurrentPage(3);
        break;
      case MENU_ITEMS.LOGOUT:
        auth.signOut();
        setCurrentPage(0);
        break;
      default:
        break;
    }
  }

  const routerSwitch = () => {
    switch(currentPage) {
      case 0:
        return <SignInScreen />;
      case 1:
        return <JoinConf user={currentUser} />;
      case 2:
        return <ConfPage user={currentUser} />;
      case 3:
        return <SettingsPage user={currentUser} setCurrentPage={setCurrentPage}/>;
      default:
        return <SignInScreen />;
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <MenuBar user={currentUser} onMenuButtonClick={handleMenuButtonClick} isSignedIn={!!currentUser} />
      <Box sx={{ marginTop: '64px' }}>
        <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
        {isLoading ? <Typography>Loading...</Typography> : routerSwitch()}
      </Box>
    </ThemeProvider>
  );
}