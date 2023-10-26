import { addDoc, arrayRemove, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where, arrayUnion, serverTimestamp, increment } from "firebase/firestore";
import { db } from './firebase';

export async function syncUsers(user) {
   const userRef = doc(db, 'users', user.uid);
   const data = {
      email: user.email
   }
   await setDoc(userRef, data, { merge: true });
}