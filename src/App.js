import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import './App.css';
import MenuBar from './components/confPage/menuBar/MenuBar';
import SupportModal from './components/confPage/supportModal/SupportModal';
import MENU_ITEMS from './constants';
import ConfPage from './components/confPage/ConfPage';
import Store from './components/confPage/store/Store';
import Social from './components/confPage/social/Social';
import FAQs from './components/confPage/faqs/FAQs';
import Profile from './components/confPage/profile/Profile';
import Home from './components/home/Home'
import SettingsPage from './components/confPage/settings/Settings';
import { Route, Routes, useNavigate } from "react-router-dom";
import SuccessPage from './components/SuccessPage';
import { auth } from './utils/firebase';
import { getUserData } from "./utils/mutations";



// Create a theme instance for the entire app
const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#B4041A"
    },
    secondary: {
      main: "#ffffff", // A white secondary color
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial', // Use the Roboto font family
    h5: {
      fontSize: '1.5rem', // Customize the font size for h5 typography
    },
  },
  shape: {
    borderRadius: 8, // Adjust the global border radius
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
  const [currentUser, setCurrentUser] = useState(null);
  const [conferenceID, setConferenceID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCaching, setIsCaching] = useState(true);
  const [supportOpen, setSupportOpen] = useState(false);


  // Preload images into the cache asynchronously
  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();

        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    });

    await Promise.all(promises);

    setIsCaching(false);
  }

  // preload the images into the cache on first load
  useEffect(() => {
    const imgs = ["/art/HPAIR Logo Banner (Black).png",
                  "/art/HPAIR Logo Banner (White).png",
                  "/art/home-background.png",
                ]
    
    // only preload images if we haven't already
    if(isCaching){
      cacheImages(imgs)
    }
  }, [isCaching])  


  const navigate = useNavigate();

  // Listen to the Firebase Auth state and set the local state.
  // This is called on sign in and sign out.
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      setIsLoading(true);
      if (user) {
        // if the user is signed in, set the currentUser
        setCurrentUser(user);
        const data = await getUserData(user);
        // if the user has a conferenceCode, set the conferenceID and navigate to the conference page
        if (data?.conferenceCode) {
          const conferenceCode = data.conferenceCode.slice(0, 7);
          setConferenceID(conferenceCode);
          if (!window.location.pathname.startsWith(`/${conferenceCode}/`)) {
            navigate(`/${conferenceCode}`);
          }
        } 
      } else {
        // if the user is signed out, clear the conferenceID and currentUser and navigate to the home page
        setCurrentUser(null);
        setConferenceID(null);
        navigate(`/`)
      }
      setIsLoading(false);
    });
    // Un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  }, [navigate]);

  // Handles button clicks within the menu
  const handleMenuButtonClick = (buttonCode) => {
    // Handle button clicks within the menu here
    switch(buttonCode) {
      case MENU_ITEMS.SUPPORT:
        setSupportOpen(true);
        break;
      case MENU_ITEMS.SETTINGS:
        navigate(`/${conferenceID}/settings`);
        break;
      case MENU_ITEMS.LOGOUT:
        auth.signOut();
        break;
      case MENU_ITEMS.PROFILE:
        navigate(`/${conferenceID}/profile`);
        break;
      default:
        break;
    }
  }

  // Add menu bar to the top of the page, takes in children
  const withMenu = (children) => {
    return (
      <Box>
        <MenuBar user={currentUser} conferenceID={conferenceID} onMenuButtonClick={handleMenuButtonClick} />
        {/* lower the children by 64 px to accomodate menubar */}
        <Box sx={{ marginTop: '64px' }}>
          {children}
        </Box>
      </Box>
    )
  }
  
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    
      {/* Don't show the screen before the images are preloaded into the cache */}
      {isCaching ? <Typography>Loading...</Typography> :  
      (<>
        {/* Don't show the main window if the window is loading (i.e. auth state is changine). Prevents flickering. */}
        {isLoading ? <Typography>Loading...</Typography> :
          <Routes>
            <Route path="/" element={<Home user={currentUser} />} />
            <Route path="/TASHYLS/*" element={<SuccessPage user={currentUser} />} />
            <Route path="/:confCode/" element={withMenu(<ConfPage user={currentUser} />)} />
            <Route path="/:confCode/settings" element={withMenu(<SettingsPage user={currentUser} />)} />
            <Route path="/:confCode/store" element={withMenu(<Store user={currentUser} />)} />
            <Route path="/:confCode/social" element={withMenu(<Social user={currentUser} />)} />
            <Route path="/:confCode/faqs" element={withMenu(<FAQs user={currentUser} />)} />
            <Route path="/:confCode/profile" element={withMenu(<Profile user={currentUser} />)} />
            {/* add default route that shows no routes found */}
            <Route path="*" element={<Typography>404: Not Found</Typography>} />
          </Routes>
        }
      </>
      )}
    </ThemeProvider>
  );
}