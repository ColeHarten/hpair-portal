import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

// Synchronize users table upon login
export async function syncUsers(user) {
   try{
      const userRef = doc(db, 'users', user.uid)
      // If the user does not have an existing entry in the users table, then create it
      const userDoc = await getDoc(userRef)
      if (!userDoc.exists()) {
         await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName,
         })
      } 
   } catch (error) {
      console.error(error);
   }
}

// Define a function to check if a document exists
export async function isValidConfCode(conferenceCode) {
   try{
      const confRef = doc(db, 'conferences', conferenceCode);
      const confDoc = await getDoc(confRef);
      return confDoc.exists();
   } catch (error) {
      console.error(error);
      return false;
   }
}

// Define a function to validate ticket class by checking if it exists in the prices map
export async function isValidTicketClass(conferenceCode, ticketClass) {
   try{
      const confRef = doc(db, 'conferences', conferenceCode);
      const confDoc = await getDoc(confRef);
      return confDoc.data().prices[ticketClass] === undefined ? false : true;
   } catch (error) {
      console.error(error);
      return false;
   }
}

// mutation to get user data
export async function getUserData(user) {
   try{
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
         return userDoc.data();
      } else {
         return null;
      }
   } catch (error) {
      console.error(error);
   }
}

// mutation to get conference data
export async function getConferenceData(conferenceCode) {
   try{
      const confRef = doc(db, 'conferences', conferenceCode);
      const confDoc = await getDoc(confRef);
      if (confDoc.exists()) {
         return confDoc.data();
      } else {
         return null;
      }
   } catch (error) {
      console.error(error);
   }
}

// mutation to add conference code to user doc
export async function addConferenceCode(user, joinCode, paymentID) {
   try {
      const conferenceCode = joinCode.slice(0,7);
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
         conferenceCode: conferenceCode,
         ticketClass: joinCode.split('-')[1],
         paymentTime: serverTimestamp(),
         paymentID: paymentID,
      });
      await updateDoc(doc(db, 'conferences', conferenceCode), {
         attendees: arrayUnion(user.uid),
      });
   } catch (error) {
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

export async function getPaymentInfo(orderID) {
   try{
      const paymentRef = doc(db, 'payments', orderID);
      const paymentDoc = await getDoc(paymentRef);
      if (paymentDoc.exists()) {
         return paymentDoc.data();
      } else {
         return null;
      }
   } catch (error) {
      console.error(error);
   }
}

// Import necessary dependencies, assuming 'db' is already properly initialized

export function getAllConferenceData() {
   return new Promise((resolve, reject) => {
     const conferencesRef = db.collection('conferences');
 
     const unsubscribe = conferencesRef.onSnapshot(
       (snapshot) => {
         const conferences = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data(),
         }));
         resolve(conferences);
       },
       (error) => {
         reject(error);
       }
     );
 
     // Return a cleanup function to unsubscribe from the snapshot listener
     return unsubscribe;
   });
 }

 // Function to create an onSnapshot listener for a specific conference
export function subscribeToConference (confId, callback) {
   const conferenceRef = doc(db, 'conferences', confId);
 
   // Set up onSnapshot listener and provide the callback function
   const unsubscribe = onSnapshot(conferenceRef, (docSnapshot) => {
     if (docSnapshot.exists()) {
       // Pass the document data to the callback
       callback(docSnapshot.data());
     } else {
       // Handle document not found
       console.log(`Conference with ID ${confId} not found`);
     }
   });
 
   // Return the unsubscribe function to allow unsubscribing later
   return unsubscribe;
 };
 
//  create a snapshot to listen for all users in the `users` collection with cofereceCode == confCode
export function subscribeToUsersInConf(confCode, callback) {
   const usersRef = db.collection('users');
   const unsubscribe = usersRef.where('conferenceCode', '==', confCode).onSnapshot((snapshot) => {
      const users = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));
      callback(users);
   });
   return unsubscribe;
}

export function subscribeToUsers(callback) {
   const usersRef = db.collection('users');
   const unsubscribe = usersRef.onSnapshot((snapshot) => {
      const users = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));
      callback(users);
   });
   return unsubscribe;
}