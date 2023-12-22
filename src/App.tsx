import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import { createTheme } from '@mui/material/styles';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import MenuBar from './components/confPage/menuBar/MenuBar';
import SupportModal from './components/confPage/supportModal/SupportModal';
import MENU_ITEMS from './constants';
import ConfPage from './components/confPage/ConfPage';
import Store from './components/confPage/store/Store';
import Social from './components/confPage/social/Social';
import FAQs from './components/confPage/faqs/FAQs';
import Profile from './components/confPage/profile/Profile';
import Home from './components/home/Home';
import SettingsPage from './components/confPage/settings/Settings';
import SuccessPage from './components/SuccessPage';
import { auth } from './utils/firebase';
import { getUserData } from "./utils/mutations";

import AdminHome from './components/adminPage/adminHome/AdminHome';
import AdminUsers from './components/adminPage/adminUsers/AdminUsers';
import AdminConference from './components/adminPage/adminConference/AdminConference';

import type { User } from './utils/types';

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
});


export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [conferenceID, setConferenceID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCaching, setIsCaching] = useState<boolean>(true);
  const [supportOpen, setSupportOpen] = useState<boolean>(false);

  // Preload images into the cache asynchronously
  const cacheImages = async (srcArray: string[]) => {
    const promises = srcArray.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
  
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    });
  
    await Promise.all(promises);
  
    setIsCaching(false);
  };
  

  // preload the images into the cache on first load
  useEffect(() => {
    const imgs = ["/art/HPAIR Logo Banner (Black).png",
      "/art/HPAIR Logo Banner (White).png",
      "/art/home-background.png",
    ]

    // only preload images if we haven't already
    if (isCaching) {
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
        setCurrentUser(await getUserData(user.uid));
        // if (currentUser?.credential && currentUser?.credential === "ADMIN") {
        //   if (!window.location.pathname.startsWith(`/ADMIN/`)) {
        //     navigate(`/ADMIN`);
        //   }
        // } else {
          // if the user has a conferenceCode, set the conferenceID and navigate to the conference page
          if (currentUser?.conferenceCode) {
            const conferenceCode = currentUser.conferenceCode.slice(0, 7);
            setConferenceID(conferenceCode);
            if (!window.location.pathname.startsWith(`/${conferenceCode}/`)) {
              navigate(`/${conferenceCode}`);
            }
          }
        // }
      } else {
        // if the user is signed out, clear the conferenceID and currentUser and navigate to the home page
        setCurrentUser(null);
        setConferenceID(null);
        navigate(`/`);
      }
      setIsLoading(false);
    });
    // Un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  }, [navigate]);

  // Handles button clicks within the menu
  const handleMenuButtonClick = (buttonCode : number) => {
    // Handle button clicks within the menu here
    switch (buttonCode) {
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
  const withMenu = (children : any) => {
    return (
      <Box>
        {currentUser && <MenuBar user={currentUser} onMenuButtonClick={handleMenuButtonClick} />}
        {/* lower the children by 64 px to accommodate menubar */}
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
          {/* Don't show the main window if the window is loading (i.e. auth state is changing). Prevents flickering. */}
          {/* TODO: MAKE THE NON-CONFPAGE CONFERENCE PATHS DYNAMIC */}
          {isLoading ? <Typography>Loading...</Typography> :
            <Routes>
              <Route path="/" element={<Home user={currentUser} />} />
              <Route path="/TASHYLS/*" element={<SuccessPage user={currentUser} />} />
              <Route path="/VHYLS24/*" element={<SuccessPage user={currentUser} />} />

              <Route path="/ADMIN/" element={<AdminHome />} />
              <Route path="/ADMIN/users" element={<AdminUsers />} />
              <Route path="/ADMIN/:confCode/" element={<AdminConference />} />

              <Route path="/:confCode/" element={withMenu(<ConfPage user={currentUser} />)} />
              <Route path="/:confCode/settings" element={withMenu(<SettingsPage user={currentUser} />)} />
              <Route path="/:confCode/store" element={withMenu(<Store user={currentUser} />)} />
              <Route path="/:confCode/social" element={withMenu(<Social />)} />
              <Route path="/:confCode/faqs" element={withMenu(<FAQs />)} />
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
