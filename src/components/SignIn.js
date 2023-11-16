import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebase';


export default function SignIn({ onSignUpClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const textFieldStyles = {
    container: {
      margin: '8px 0',
      backgroundColor: 'transparent',
      color: 'white',
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
        {/* TODO: The auto fill info from the browser breaks the styles. */}
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
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={textFieldStyles.container}
          InputProps={{
            style: textFieldStyles.input,
          }}
          InputLabelProps={{
            style: textFieldStyles.label,
          }}
          required
        />
        <Button variant="contained" onClick={handleSignIn} 
          color="secondary"
        >
          Sign In
        </Button>
        <Typography component={"span"} margin="8px 0">
        <Box>
        <Typography>
          Don't have an account?  <Link 
            component="button" 
            variant="body2" 
            onClick={onSignUpClick} 
            style={{ textDecoration: 'none', color: '#6e8eb8' }}
          >
            <strong>Sign up instead</strong>
          </Link>
          <br />
          <center>
            <Link 
              component="button" 
              variant="body2" 
              onClick={handleForgotPassword} 
              style={{ textDecoration: 'none', color: '#6e8eb8' }}
            >
              <strong>Forgot Password?</strong>
            </Link>
          </center>
          </Typography>
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
        <Typography variant="h4">Forgot Password</Typography>
        <Box
          sx={{
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
            margin: '8px 0',
          }} />
        <TextField
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setPassword(e.target.value)}
          style={textFieldStyles.container}
          InputProps={{
            style: textFieldStyles.input,
          }}
          InputLabelProps={{
            style: textFieldStyles.label,
          }}
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