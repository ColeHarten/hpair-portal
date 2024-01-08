import { Unsubscribe, doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { User } from '../types';

// Synchronize users table upon login
export async function syncUsers(user: User): Promise<void> {
    try {
      const userRef = doc(db, 'users', user.uid);
  
      // If the user does not have an existing entry in the users table, then create it
      const userDoc = await getDoc(userRef);
      
      // since we are never using setDoc when the user already exists, we won't ever overwrite defined values with null
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
        });
      }
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
          // increment registrants by 1
          registrants: increment(1),
          
       });
    } catch (error) {
       console.error(error);
    }
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
          paymentTime: doc.data().paymentTime ? new Date(doc.data().paymentTime.seconds * 1000) : null,
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

// mutation to remove user from the conference, the payment document is saved for record keeping
export async function removeUser(uid : string, conferenceCode : string) : Promise <boolean> {
    try {
        const userRef = doc(db, 'users', uid);
        // remove this user from the conference
        await updateDoc(userRef, {
            conferenceCode: null,
            ticketClass: null,
            paymentID: null,
            paymentTime: null,
        });
        // decrement the conference counter
        await updateDoc(doc(db, 'conferences', conferenceCode), {
            registrants: increment(-1),
        });
        return true;
    } catch (error) {
       console.error(error);
       return false;
    }
 }