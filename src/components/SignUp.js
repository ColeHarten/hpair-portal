import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { auth } from '../utils/firebase';

export default function SignUp({ onSignInClick }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if(password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      // Create the user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      // Update the user object with the display name (both first and last name)
      await user.updateProfile({
        displayName: name,
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
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ margin: '8px 0' }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '8px 0' }}
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ margin: '8px 0' }} />
      <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
      <Typography>Already have an account? <a href="#" onClick={onSignInClick}>Sign In</a></Typography>
    </Box>

  );
}