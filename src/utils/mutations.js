import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from './firebase';

// mutation to add conference code to user doc
export async function addConferenceCode(user, conferenceCode) {
   const userRef = doc(db, 'users', user.uid);
   await updateDoc(userRef, {
      conferenceCode: conferenceCode
   });
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