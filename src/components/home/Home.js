import { Box } from "@mui/material";
import { useState } from 'react';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import JoinConf from "./JoinConf.js";
import Planet from './planet/Planet.tsx';

export default function Home({user}) {
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
        color: 'white', // You can set the text color as needed
        maxHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '20px',
          // justifyContent: 'center',
          gap: 8,
          '@media (max-width:850px)': {
            flexDirection: 'column',
          },
        }}
      >
      <Box sx={{
          // width: '45%',
          // maxWidth: '45vw', // Adjusted width to take the full width on smaller screens
      }}>
        <Planet />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // width: '55%', // Adjusted width to take the full width on smaller screens
        }}
      >
        <img src="art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width="100%" style={{ minWidth: '291px' }} />
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
            width: '60%',
            maxHeight: '80vh',
            minWidth: '350px',
          }}
        >
          {!user ?
           ( isSignUp ? (
              <SignUp onSignInClick={handleSignInClick} />
            ) : (
              <SignIn onSignUpClick={handleSignUpClick} />
            )) : (
            <Box sx={{overflow: "auto"}}>
              <JoinConf user={user} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  </Box>
  );
}