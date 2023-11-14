import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useState } from 'react';
import { auth } from '../utils/firebase';
import { syncUsers } from '../utils/mutations';

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
    if(email === '' || name === '' || password === '' || confirmPassword === '') {
      alert("Please fill out all fields.");
      return;
    }
    try {
      // Create the user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);

      await userCredential.user.updateProfile({
          displayName: name,
      });

      await syncUsers(userCredential.user)

      // User is signed up with the name added to their profile and Firestore document.
      // You can handle redirection or any other logic here.
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        // The provided email is already in use.
        // Show an alert to the user.
        alert("Email is already in use. Please choose a different email or sign in.");
      } else if (error.code === "auth/invalid-email"){
        // The provided email is not valid.
        alert("Please enter a valid email.");
      } else {
        // Handle other sign-up errors (e.g., display a general error message).
        console.error(error);
      }
    }
  };
   
  return (
    <Box style={{
      display: 'flex',           
      flexDirection: 'column',    
      alignItems: 'center',  
      justifyContent: 'center', 
    }}>
      <Typography variant="h5">Sign Up</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ margin: '8px 0' }}

      />
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ margin: '8px 0' }}

      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ margin: '8px 0' }}

      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        style={{ margin: '8px 0' }}

      />
      <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
      <Typography component={"span"}>
        Already signed up? <Link component="button" variant="body1" onClick={onSignInClick}>Sign In</Link>
      </Typography>
    </Box>

  );
}