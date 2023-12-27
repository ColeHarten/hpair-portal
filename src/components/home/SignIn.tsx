import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { auth } from '../../utils/firebase';
import PasswordInput from "./PasswordInput";

import axios from 'axios';

interface SignInProps {
  setIsSignUp: (isSignUp: boolean) => void;
}

export default function SignIn({ setIsSignUp }: SignInProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

  const textFieldStyles = {
    container: {
      margin: '8px 0',
      backgroundColor: 'transparent',
      width: '80%',
    },
    input: {
      color: 'white',
    },
    label: {
      color: 'white',
    },
  };

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // User is signed in. You can handle redirection or any other logic here.
    } catch {
      alert("Invalid email or password. Please try again or reset your password. If you are still having issues, please reach out to conference support.")
    }
  };

  const handleForgotPassword = () => {
    // Show the "Forgot Password" input fields
    setEmail('');
    setPassword('');
    setShowForgotPassword(true);
  };

  const handleSendPasswordResetEmail = async () => {
    // Add code here to send a password reset email
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset email sent. Please check your email for instructions.");
      setShowForgotPassword(false); // Hide the "Forgot Password" input fields
    } catch (error) {
      alert("Failed to send the password reset email. Please try again later.");
      console.error(error);
    }
  };

  if (!showForgotPassword) {
    return (
      <Box style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant="h4">Sign In</Typography>
        <Box
          sx={{
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
            margin: '8px 0',
          }} />
        <TextField
          label="Email"
          value={email}
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          style={textFieldStyles.container}
          InputProps={{
            style: textFieldStyles.input,
          }}
          InputLabelProps={{
            style: textFieldStyles.label,
          }}
          color='secondary'
          required
        />
        <PasswordInput
          label="Password"
          id="adornment-password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={textFieldStyles.container}
          inputProps={{
            style: textFieldStyles.input,
          }}
          InputLabelProps={{
            style: textFieldStyles.label,
          }}
          color="secondary"
          required
        />
        <Button variant="contained" onClick={handleSignIn}
          color="secondary"
        >
          Sign In
        </Button>
        <Typography component="div" sx={{p: '10px'}}>
          Don't have an account?
          <Button
            variant="text"
            onClick={() => setIsSignUp(true)}
            sx={{
              textDecoration: 'none',
              color: '#6e8eb8',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: 'inherit', 
              p: '0px',
              marginLeft: '5px',
            }}
          >
            Sign up
          </Button> <br />
          <Button
            variant="text"
            onClick={handleForgotPassword}
            sx={{
              textDecoration: 'none',
              p: '0px',
              color: '#6e8eb8',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: 'inherit', 
            }}
          >
            Forgot Password?
          </Button>
        </Typography>

      </Box>
    );
  } else {
    return (
      <Box style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant="h4">Forgot Password</Typography>
        <Box
          sx={{
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
            margin: '8px 0',
          }}
        />
        <TextField
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={textFieldStyles.container}
          InputProps={{
            style: textFieldStyles.input,
          }}
          InputLabelProps={{
            style: textFieldStyles.label,
          }}
          color='secondary'
          required
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSendPasswordResetEmail}
        >
          Send Email
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => setShowForgotPassword(false)} // Go back to the sign-in form
          style={{ marginTop: '8px', backgroundColor: 'transparent', color: 'white' }}
        >
          Back to Sign In
        </Button>
      </Box>
    );
  }
}
