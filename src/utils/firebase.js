// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

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
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,

		},
	],
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

// Export Firestore database
export const db = getFirestore(app)
