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
async function reauthenticateWithPassword(oldPassword: string): Promise<any> {
  if(auth.currentUser && auth.currentUser.email){
    const credentials = EmailAuthProvider.credential(auth.currentUser.email, oldPassword); 
    await auth.currentUser.reauthenticateWithCredential(credentials);
    return credentials;
  }
}


// Password update function
async function updatePassword(newPassword : string) : Promise<void> {
  if(auth.currentUser){
    await auth.currentUser.updatePassword(newPassword);
  }
}

export const useAuth = () => {
  return { reauthenticateWithPassword, updatePassword };
}