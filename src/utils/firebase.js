import { EmailAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeX3qc3Rx_otux7Lkw0-9s0DCit80oQjg",
  authDomain: "hpair-portal-95a4f.firebaseapp.com",
  projectId: "hpair-portal-95a4f",
  storageBucket: "hpair-portal-95a4f.appspot.com",
  messagingSenderId: "756263551416",
  appId: "1:756263551416:web:07b4274b5bf6fe20888f4d",
  measurementId: "G-8PY0ZF2HL3"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export the auth and firestore services
export const db = app.firestore();
export const auth = app.auth();

// Reauthentication function
async function reauthenticateWithPassword(user, oldPassword) {
  const credentials = EmailAuthProvider.credential(user.email, oldPassword); 
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
