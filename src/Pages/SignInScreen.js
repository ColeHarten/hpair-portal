import { Box, Paper } from "@mui/material";
import { useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

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
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: 'calc(100vh - 64px)', // subtract height of menu bar
      display: 'flex',
      flexDirection: 'column',  // Stack contents vertically
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
    }}
  >
    <Paper
      sx={{
        width: '30%',     // Take up 1/3 of the width
        minWidth: '350px', // But at least 300px
        height: '100%',   // Take up the full height
        p: 2,              // Add some padding
      }}
    >
      <img src="/HPAIR Logo Banner (Black).png" alt="HPAIR Logo" width='100%'  />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '50px 0'}}>
        {isSignUp ? (
          <SignUp onSignInClick={handleSignInClick} />
        ) : (
          <SignIn onSignUpClick={handleSignUpClick} />
        )}
      </Box>
    </Paper>
  </Box>
  );
}