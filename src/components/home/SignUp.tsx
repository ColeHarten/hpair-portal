import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { auth } from '../../utils/firebase';
import { syncUsers } from '../../utils/mutations/users';
import type { User } from '../../utils/types';
import PasswordInput from "./PasswordInput";

interface SignUpProps {
  setIsSignUp: (isSignUp : boolean) => void;
  setUser: (user: User) => void;
}

export default function SignUp({ setIsSignUp, setUser }: SignUpProps) {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const textFieldStyles = {
    container: {
      margin: '8px 0',
      backgroundColor: 'transparent',
      borderColor: 'white',
      width: '80%'
    },
    input: {
      color: 'white',
      borderColor: 'white',
    },
    label: {
      color: 'white',
    },
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    if (email === '' || name === '' || password === '' || confirmPassword === '') {
      alert("Please fill out all fields.");
      return;
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }
    try {
      // Create the user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);

      if(userCredential.user === null){
        throw new Error("User is null");
      }

      await userCredential.user.updateProfile({
        displayName: name,
      });

      const user : User = {
        displayName: name,
        email: email,
        uid: userCredential.user.uid,
        conferenceCode: null,
        paymentID: null,
        ticketClass: null,
        paymentTime: null,
      }

      await syncUsers(user);
      setUser(user);
      
      // User is signed up with the name added to their profile and Firestore document.
      // You can handle redirection or any other logic here.
    } catch (error : any) {
      if (error.code === "auth/email-already-in-use") {
        // The provided email is already in use.
        // Show an alert to the user.
        alert("Email is already in use. Please choose a different email or sign in.");
      } else if (error.code === "auth/invalid-email") {
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
      <Typography variant="h4">Sign Up</Typography>
      <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: 'white',
          margin: '8px 0',
        }} />
      <TextField
        label="Name"
        value={name}
        variant="standard"
        onChange={(e) => setName(e.target.value)}
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
      <TextField
        label="Confirm Password"
        variant="standard"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
      <Button variant="contained" onClick={handleSignUp}
        color="secondary"
      >Sign Up</Button>
      <Typography sx={{ margin: '8px 0', display: 'flex', alignItems: 'center', fontSize: 'inherit' }}>
      Already signed up? 
      <Button
        onClick={()=>setIsSignUp(false)}
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
        Sign in
      </Button>
    </Typography>
    </Box>

  );
}
