// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import StyledFirebaseAuth from './StyledFirebaseAuth.js';
import { GoogleAuthProvider } from "firebase/auth";
import {Paper, Box, Typography} from "@mui/material";

// import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaMD_8CvO5mizLIIHsSQLm-WVgQhEvaOs",
  authDomain: "hpair-portal-b4323.firebaseapp.com",
  projectId: "hpair-portal-b4323",
  storageBucket: "hpair-portal-b4323.appspot.com",
  messagingSenderId: "619941079367",
  appId: "1:619941079367:web:f156c75a252e93b9030462"
};


// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	signInOptions: [
		// {
		// 	provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,

		// },
      {
         provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
         customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: 'select_account',
         },
      },
	],
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

// Export Firestore database
export const db = getFirestore(app)

// Export FirebaseUI signin screen
export function SignInScreen() {
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
      <Typography variant="h4">Choose sign in method</Typography>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
   </Box>
   );
}