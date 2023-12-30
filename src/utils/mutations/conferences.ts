import { Unsubscribe, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

import { Conference } from '../types';


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
 

// Function to create an onSnapshot listener for all conferences
export function subscribeToConferences(callback: (data: Conference[]) => void): Unsubscribe {
    const conferencesRef = db.collection('conferences');
  
    // Set up onSnapshot listener and provide the callback function
    const unsubscribe = onSnapshot(conferencesRef, (snapshot: any) => {
      const conferences: Conference[] = snapshot.docs.map((doc: any) => ({
          conferenceCode: doc.id,
          conferenceName: doc.data().conferenceName,
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