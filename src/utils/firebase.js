import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { EmailAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaMD_8CvO5mizLIIHsSQLm-WVgQhEvaOs",
  authDomain: "hpair-portal-b4323.firebaseapp.com",
  projectId: "hpair-portal-b4323",
  storageBucket: "hpair-portal-b4323.appspot.com",
  messagingSenderId: "619941079367",
  appId: "1:619941079367:web:f156c75a252e93b9030462"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export the auth and firestore services
export const db = app.firestore();
export const auth = app.auth();


// Reauthentication function
async function reauthenticateWithPassword(user, oldPassword) {
  const credentials = EmailAuthProvider.credential(user.email, oldPassword); // Corrected usage
  await user.reauthenticateWithCredential(credentials);
  return credentials;
}

// Password update function
async function updatePassword(user, newPassword) {
  await user.updatePassword(newPassword);
}

export const useAuth = () => {
  return { reauthenticateWithPassword, updatePassword };
}

// Configure FirebaseUI (if needed)
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
    },
  ],
};