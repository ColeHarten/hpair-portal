import { Box } from "@mui/material";
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
      <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '50%', // Adjusted width to take the full width on smaller screens
          // '@media (min-width:600px)': {
          //   width: '50%', // Takes 50% width on larger screens
          // },
        }}>
        <Planet />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '50%', // Adjusted width to take the full width on smaller screens
        }}
      >
        <img src="/art/hpair-logo-white.png" alt="HPAIR Logo" width="50%" />

        <Box
          sx={{
            p: 4,
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(220, 20, 60, 0.7)',
            border: '4px solid #fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // maxWidth: '100%',
            width: '60%',
          }}
          component="div"
        >
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