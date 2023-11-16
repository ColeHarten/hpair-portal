import { Box, Button, TextField, Typography, Input } from "@mui/material";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebase';
import OutlinedInput from '@mui/material/OutlinedInput';

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
      }}>
        <Typography variant="h5" >Sign In</Typography>
        <Box
          sx={{
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
            margin: '8px 0',
          }} />
        <Input
          placeholder="Email"
          label="Email"
          type="email"
          value={email}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '8px 0', backgroundColor: "transparent", 
                    color: "white"
                }}
          required
        />
        <Input
          placeholder="Password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '8px 0', backgroundColor: "transparent", color: "white" }}
          required
        />
        <Button variant="contained" onClick={handleSignIn} sx={{
          outline: "white solid 2px",
          marginTop: "10px",
          color: "#A51C30",
        }}>
          Sign In
        </Button>
        <Typography component={"span"}>
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
      }}>
      <Typography variant="h5">Forgot Password</Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '8px 0' }}
          required
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