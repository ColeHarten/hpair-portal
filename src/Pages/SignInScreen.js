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
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',  // Stack contents vertically
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
      }}
    >
      <Paper
        sx={{
          width: '100%',     // Take up the full width
          maxWidth: 400,     // Limit the maximum width
          p: 2,              // Add some padding
          height: 'auto',    // Allow the height to adjust to content
        }}
      >
        {isSignUp ? (
          <SignUp onSignInClick={handleSignInClick} />
        ) : (
          <SignIn onSignUpClick={handleSignUpClick} />
        )}
      </Paper>
    </Box>
   );
}