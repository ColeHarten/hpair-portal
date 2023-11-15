import { Box, Paper } from "@mui/material";
import { useState } from 'react';
import SignIn from '../components/SignIn.js';
import SignUp from '../components/SignUp.js';


import Planet from '../components/planet/Planet.tsx';

export default function SignInScreen() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  return (
  // create a box with a background image
  <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url("art/shanghai.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white', // You can set the text color as needed
      }}
      component="div"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          '@media (min-width:600px)': {
            flexDirection: 'row',
          },
        }}
      >
        <Planet />
        <Box>
          <img src="/art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width="100%" />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '50px 0' }}>
            {isSignUp ? (
              <SignUp onSignInClick={handleSignInClick} />
            ) : (
              <SignIn onSignUpClick={handleSignUpClick} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}