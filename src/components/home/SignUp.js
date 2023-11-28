import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { auth } from '../../utils/firebase';
import { syncUsers } from '../../utils/mutations';
import PasswordInput from "./PasswordInput";


export default function SignUp({ onSignInClick }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    if(password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    if(email === '' || name === '' || password === '' || confirmPassword === '') {
      alert("Please fill out all fields.");
      return;
    } else if(password.length < 8) {
      alert("Password must be at least 8 characters.");
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
      <PasswordInput
          label="Confirm Password"
          id="adornment-password"
          variant="standard"
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
          // style={{outline: "white solid 2px",}}
          color="secondary"
        >Sign Up</Button>
      <Typography component={"span"} type="body3" margin="8px 0">
        Already signed up? <Link 
            component="button" 
            onClick={onSignInClick} 
            style={{ textDecoration: 'none', color: '#6e8eb8' }}
          >
            <strong>Sign in instead</strong>
          </Link>
      </Typography>
    </Box>

  );
}