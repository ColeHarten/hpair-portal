import {Paper, Box, Typography} from "@mui/material";
import {TextField, Button} from "@mui/material";
import { useState } from 'react';

import firebase from 'firebase/compat/app';

function SignIn({ onSignUpClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // User is signed in. You can handle redirection or any other logic here.
    } catch (error) {
      // Handle sign-in errors (e.g., display an error message to the user).
      console.error(error);
    }
  };

  return (
    <Box   style={{
      display: 'flex',           // Use flex display
      flexDirection: 'column',    // Stack items vertically
      alignItems: 'center',       // Align items horizontally to the center
      justifyContent: 'center',   // Align items vertically to the center
      minHeight: '100vh',         // Full viewport height
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
      <Typography>Don't have an account? <a href="#" onClick={onSignUpClick}>Sign Up</a></Typography>
    </Box>
  );
}

function SignUp({ onSignInClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = async () => {
    try {
      // Create the user with email and password
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
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