import {Paper, Box, Typography} from "@mui/material";
import {TextField, Button} from "@mui/material";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebase';

function SignIn({ onSignUpClick }) {
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

function SignUp({ onSignInClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = async () => {
    try {
      // Create the user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      // Update the user object with the display name (both first and last name)
      await user.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      // User is signed up with the name added to their profile and Firestore document.
      // You can handle redirection or any other logic here.
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        // The provided email is already in use.
        // Show an alert to the user.
        alert("Email is already in use. Please choose a different email or sign in.");
      } else {
        // Handle other sign-up errors (e.g., display a general error message).
        console.error(error);
      }
    }
  };
  
   
  return (
    <Box style={{
      display: 'flex',           // Use flex display
      flexDirection: 'column',    // Stack items vertically
      alignItems: 'center',       // Align items horizontally to the center
      justifyContent: 'center',   // Align items vertically to the center
      minHeight: '100vh',         // Full viewport height
    }}>
      <Typography variant="h5">Sign Up</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: '8px 0' }} 
      />
      <TextField
        label="First Name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={{ margin: '8px 0' }}
      />
      <TextField
        label="Last Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={{ margin: '8px 0' }} 
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '8px 0' }}
      />
      <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
      <Typography>Already have an account? <a href="#" onClick={onSignInClick}>Sign In</a></Typography>
    </Box>

  );
}

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