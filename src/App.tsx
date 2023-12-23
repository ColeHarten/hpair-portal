import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import SuccessPage from './components/SuccessPage';
import ConfPage from './components/confPage/ConfPage';
import FAQs from './components/confPage/faqs/FAQs';
import Profile from './components/confPage/profile/Profile';
import SettingsPage from './components/confPage/settings/Settings';
import Social from './components/confPage/social/Social';
import Store from './components/confPage/store/Store';
import Home from './components/home/Home';
import { auth } from './utils/firebase';
import { getUserData } from "./utils/mutations";

import AdminConference from './components/adminPage/adminConference/AdminConference';
import AdminHome from './components/adminPage/adminHome/AdminHome';
import AdminUsers from './components/adminPage/adminUsers/AdminUsers';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCaching, setIsCaching] = useState<boolean>(true);

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
        const userData = await getUserData(user.uid);
        setCurrentUser(userData);
        // if the user has a conferenceCode, set the conferenceID and navigate to the conference page
        if (userData?.conferenceCode) {
          const conferenceCode = userData.conferenceCode.slice(0, 7);
          if (!window.location.pathname.startsWith(`/${conferenceCode}/`)) {
            navigate(`/${conferenceCode}`);
          }
        } 
      } else {
        // if the user is signed out, clear the conferenceID and currentUser and navigate to the home page
        setCurrentUser(null);
        navigate(`/`)
      }
      setIsLoading(false);
    });
    // Un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  }, [navigate]);

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      
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

              <Route path="/:confCode/" element={<ConfPage user={currentUser} />} />
              <Route path="/:confCode/settings" element={<SettingsPage user={currentUser} />} />
              <Route path="/:confCode/store" element={<Store user={currentUser}/>} />
              <Route path="/:confCode/social" element={<Social user={currentUser}/>} />
              <Route path="/:confCode/faqs" element={<FAQs user={currentUser}/>} />
              <Route path="/:confCode/profile" element={<Profile user={currentUser} />} />
              {/* add default route that shows no routes found */}
              <Route path="*" element={<Typography>404: Not Found</Typography>} />
            </Routes>
          }
        </>
        )}
    </ThemeProvider>
  );
}
