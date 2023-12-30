import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { Payment } from '../types';

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