import { db } from './firebase';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

// mutation to add conference code to user doc
export async function addConferenceCode(user, conferenceCode) {
   const userRef = doc(db, 'users', user.uid);
   await updateDoc(userRef, {
      conferenceCode: conferenceCode
   });
}


// Define a function to check if a document exists
export async function isValidConfCode(conferenceCode) {
   const confRef = doc(db, 'conferences', conferenceCode);
   const confDoc = await getDoc(confRef);
   return confDoc.exists();
 }

// mutation to get user data
export async function getUserData(user) {
   const userRef = doc(db, 'users', user.uid);
   const userDoc = await getDoc(userRef);
   if (userDoc.exists()) {
      return userDoc.data();
   } else {
      return null;
   }
}