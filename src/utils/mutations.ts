import { Unsubscribe, arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc, increment } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

import {User, Payment, Conference} from './types';

// Synchronize users table upon login
export async function syncUsers(user: User): Promise<void> {
   try {
     const userRef = doc(db, 'users', user.uid);
 
     // If the user does not have an existing entry in the users table, then create it
     const userDoc = await getDoc(userRef);
 
     if (!userDoc.exists()) {
       await setDoc(userRef, {
         email: user.email,
         displayName: user.displayName,
       });
     }
 
     // Return an updated list of users (modify based on your data structure)
     // For example, you might want to fetch and return the updated user list after synchronization
     // const updatedUsers = await getAllUsers();
     // return updatedUsers;
   } catch (error) {
     console.error(error);
     throw error; // Rethrow the error to indicate that the synchronization failed
   }
 }

// Define a function to check if a document exists
export async function isValidConfCode(conferenceCode : string) : Promise<boolean> {
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
export async function isValidTicketClass(conferenceCode : string, ticketClass : string) : Promise<boolean> {
   try{
      const confRef = doc(db, 'conferences', conferenceCode);
      const confDoc = await getDoc(confRef);
      return confDoc.data()?.prices[ticketClass] === undefined ? false : true;
   } catch (error) {
      console.error(error);
      return false;
   }
}

// mutation to get user data
export async function getUserData(uid: string): Promise<User | null> {
   try {
       const userRef = doc(db, 'users', uid);
       const userDoc = await getDoc(userRef);

       if (userDoc.exists()) {
           const user: User = {
               uid: userDoc.id,
               displayName: userDoc.data().displayName,
               email: userDoc.data().email,
               conferenceCode: userDoc.data().conferenceCode ?? null,
               ticketClass: userDoc.data().ticketClass ?? null,
               paymentID: userDoc.data().paymentID ?? null,
               paymentTime: userDoc.data().paymentTime ? new Date(userDoc.data().paymentTime.seconds * 1000) : null,
           };
           return user;
       } else {
           return null;
       }
   } catch (error) {
       console.error(error);
       // Handle the error or rethrow it if needed
       throw error;
   }
}

// mutation to get conference data
export async function getConferenceData(conferenceCode: string): Promise<Conference | null> {
   try {
      const confRef = doc(db, 'conferences', conferenceCode);
      const confDoc = await getDoc(confRef);
      
      if (confDoc.exists()) {
         return confDoc.data() as Conference;
      } else {
         return null;
      }
   } catch (error) {
      console.error(error);
      return null;
   }
}


// mutation to add conference code to user doc
export async function addConferenceCode(uid : string, joinCode : string, paymentID : string) : Promise<void> {
   try {
      const conferenceCode = joinCode.slice(0,7);
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
         conferenceCode: conferenceCode,
         ticketClass: joinCode.split('-')[1],
         paymentTime: serverTimestamp(),
         paymentID: paymentID,
      });
      await updateDoc(doc(db, 'conferences', conferenceCode), {
         attendees: arrayUnion(uid),
         // increment registrants by 1
         registrants: increment(1),
         
      });
   } catch (error) {
      console.error(error);
   }
}

// mutation to add payment info to new payments collection 
export async function addPaymentInfo(paymentInfo : Payment) : Promise<void> {
   try{
      await setDoc(doc(db, 'payments', paymentInfo.orderID), {
         uid: paymentInfo.uid,
         amount: paymentInfo.amount,
         orderID: paymentInfo.orderID,
         currency: paymentInfo.currency,
         payerID: paymentInfo.payerID,
         paymentTime: serverTimestamp(),
      });
   } catch (error) {
      console.error(error);
   }
}

export async function getPaymentInfo(orderID: string): Promise<Payment | null> {
   try {
      const paymentRef = doc(db, 'payments', orderID);
      const paymentDoc = await getDoc(paymentRef);

      if (paymentDoc.exists()) {
         const payment : Payment = {
            uid: paymentDoc.data().uid,
            amount: paymentDoc.data().amount,
            orderID: paymentDoc.data().orderID,
            currency: paymentDoc.data().currency,
            payerID: paymentDoc.data().payerID,
            paymentTime: new Date(paymentDoc.data().paymentTime.seconds * 1000),
            joinCode: paymentDoc.data().joinCode,
         };
         return payment;
      } else {
         return null;
      }
   } catch (error) {
      console.error(error);
      return null;
   }
}

// Function to create an onSnapshot listener for all conferences
export function subscribeToConferences(callback: (data: Conference[]) => void): Unsubscribe {
   const conferencesRef = db.collection('conferences');
 
   // Set up onSnapshot listener and provide the callback function
   const unsubscribe = onSnapshot(conferencesRef, (snapshot: any) => {
     const conferences: Conference[] = snapshot.docs.map((doc: any) => ({
         conferenceCode: doc.id,
         conferenceName: doc.data().conferenceName,
         attendees: doc.data().attendees,
         prices: doc.data().prices,
         registrants: doc.data().registrants,
     }));
     // Pass the document data to the callback
     callback(conferences);
   });
 
   // Return the unsubscribe function to allow unsubscribing later
   return unsubscribe;
 }

// Function to create an onSnapshot listener for a specific conference
export function subscribeToConference(confId: string, callback: (data: Conference | null) => void): Unsubscribe {
   const conferenceRef = doc(db, 'conferences', confId);
 
   // Set up onSnapshot listener and provide the callback function
   const unsubscribe = onSnapshot(conferenceRef, (docSnapshot: any) => {
     if (docSnapshot.exists()) {
       // Pass the document data to the callback
       const conferenceData: Conference = {
         conferenceCode: docSnapshot.id,
         conferenceName: docSnapshot.data().conferenceName,
         attendees: docSnapshot.data().attendees,
         prices: docSnapshot.data().prices,
         registrants: docSnapshot.data().registrants,
       };
       callback(conferenceData);
     } else {
       // Handle document not found
       console.log(`Conference with ID ${confId} not found`);
     }
   });
 
   // Return the unsubscribe function to allow unsubscribing later
   return unsubscribe;
 }
 
//  create a snapshot to listen for all users in the `users` collection with cofereceCode == confCode
export function subscribeToUsersInConf(confCode : string, callback : (data: User[]) => void) : Unsubscribe {
   const usersRef = db.collection('users');
   const unsubscribe = usersRef.where('conferenceCode', '==', confCode).onSnapshot((snapshot : any) => {
      const users = snapshot.docs.map((doc : any) => ({
         uid: doc.id,
         displayName: doc.data().displayName,
         email: doc.data().email,
         conferenceCode: doc.data().conferenceCode,
         ticketClass: doc.data().ticketClass,
         paymentID: doc.data().paymentID,
      }));
      callback(users);
   });
   return unsubscribe;
}

export function subscribeToUsers(callback : (data: User[]) => void) {
   const usersRef = db.collection('users');
   const unsubscribe = usersRef.onSnapshot((snapshot : any) => {
      const users = snapshot.docs.map((doc : any) => ({
         uid: doc.id,
         displayName: doc.data().displayName,
         email: doc.data().email,
         conferenceCode: doc.data().conferenceCode,
         ticketClass: doc.data().ticketClass,
         paymentID: doc.data().paymentID,
      }));
      callback(users);
   });
   return unsubscribe;
}