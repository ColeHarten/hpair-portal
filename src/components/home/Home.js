import { Box, Paper } from "@mui/material";
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
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column', // Stack contents vertically
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
    }}
  >
    <Paper
      sx={{
        width: '30%',      // Take up 1/3 of the width
        minWidth: '350px', // But at least 300px
        p: 2,              // Add some padding
        display: 'flex',   // Use Flexbox to center content
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <img src="/art/HPAIR Logo Banner (Black).png" alt="HPAIR Logo" width="100%" style={{ minWidth: '291px', marginBottom: '10px' }} />
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
      </Paper>
    </Box>
  );
}