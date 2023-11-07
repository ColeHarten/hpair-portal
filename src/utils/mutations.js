import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// Synchronize users table upon login
export async function syncUsers(user) {
	const userRef = doc(db, 'users', user.uid)
	// If the user does not have an existing entry in the users table, then create it
   const userDoc = await getDoc(userRef)
   if (!userDoc.exists()) {
      await setDoc(userRef, {
         email: user.email,
         displayName: user.displayName,
      })
   } 
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

// mutation to add conference code to user doc
export async function addConferenceCode(user, conferenceCode) {
   try{
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
         conferenceCode: conferenceCode,
         paymentTime: serverTimestamp(),
      });
      await updateDoc(doc(db, 'conferences', conferenceCode), {
         attendees: arrayUnion(user.uid),
      });
   } catch (error)
   {
      console.error(error);
   }
}

// mutation to add payment info to new payments collection 
export async function addPaymentInfo(user, paymentInfo) {
   try{
      await setDoc(doc(db, 'payments', paymentInfo.orderID), {
         uid: user.uid,
         ...paymentInfo,
         paymentTime: serverTimestamp(),
      });
   } catch (error) {
      console.error(error);
   }
}
