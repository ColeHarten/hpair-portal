import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebase';

export default function SignIn({ onSignUpClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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
        minHeight: '100vh',
      }}>
        <Typography variant="h5">Sign In</Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '8px 0' }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '8px 0' }}
        />
        <Button variant="contained" onClick={handleSignIn}>Sign In</Button>
        <Typography>
        <Box>
            <Link component="button" variant="body2" onClick={onSignUpClick}>
              Sign Up
            </Link>{" | "}
            <Link component="button" variant="body2" onClick={handleForgotPassword}>
              Forgot Password?
            </Link>
          </Box>
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
        minHeight: '100vh',
      }}>
        <Typography variant="h5">Forgot Password</Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '8px 0' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendPasswordResetEmail}
        >
          Send Email
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={() => setShowForgotPassword(false)} // Go back to the sign-in form
          style={{ marginTop: '8px' }}
        >
          Back to Sign In
        </Button>
      </Box>
    );
  }
}