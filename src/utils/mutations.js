import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
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
 