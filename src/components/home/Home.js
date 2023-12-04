import { Box } from "@mui/material";
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import JoinConf from "./JoinConf.js";
import Planet from './planet/Planet.tsx';

export default function Home({ user }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:850px)');

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
        color: 'white',
        maxHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '2%',
          gap: 8,
          '@media (max-width:850px)': {
            justifyContent: 'center',
          },
        }}
      >
        {!isSmallScreen && (
          <Box sx={{
            width: '40%',
          }}>
            <Planet />
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '60%',
          }}
        >
          <img src="art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width="70%" style={{ minWidth: '291px' }} />
          <Box
            sx={{
              px: 4,
              py: 4,
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(220, 20, 60, 0.6)',
              border: '4px solid #fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '80vh',
              minWidth: '400px',
              padding: '2rem 3rem 2rem 3rem',
            }}
          >
            {!user ?
              (isSignUp ? (
                <SignUp onSignInClick={handleSignInClick} />
              ) : (
                <SignIn onSignUpClick={handleSignUpClick} />
              )) : (
                <Box sx={{ overflow: "auto" }}>
                  <JoinConf user={user} />
                </Box>
              )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
