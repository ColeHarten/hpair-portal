/*
    THIS IS A FIREBASE FUNCTION TO SEND OUT THE EMAIL RECEIPT UPON SUCCESSFUL PAYMENT
*/

const { onRequest } = require("firebase-functions/v2/https");
const AWS = require('aws-sdk');
const cors = require('cors')({origin: true});
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./aws-config');

const admin = require('firebase-admin');
admin.initializeApp(); 
const { getDoc, doc } = require('@firebase/firestore');

const AWS_REGION = "us-east-2";
const SENDER = "Harvard Project for Asian and International Relations <help@hpair.org>";

/**
 * Retrieves payment and user data from Firestore.
 * @param {string} uid - User ID.
 * @param {string} paymentID - Payment ID.
 * @returns {Promise<Object>} - User and payment data.
 * @throws {Error} - If user or payment document does not exist.
 */
const getPaymentData = async (uid, paymentID) => {
    try {
        // Initialize Firestore
        const db = admin.firestore();

        // Fetch user data
        const userDocRef = doc(db, 'users', uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            throw new Error(`User document does not exist for uid: ${uid}`);
        }
        
        const { displayName, email, conferenceCode } = userDocSnap.data();

        // Fetch payment data
        const paymentDocRef = doc(db, 'payments', paymentID);
        const paymentDocSnap = await getDoc(paymentDocRef);

        if (!paymentDocSnap.exists()) {
            throw new Error(`Payment document does not exist for paymentID: ${paymentID}`);
        }

        const { amount, orderID } = paymentDocSnap.data();

        // Return user and payment data
        return { displayName, email, amount, orderID, conferenceCode };
    } catch (error) {
        console.error('Error fetching payment data:', error.message);
        throw error; // Re-throw the error for handling at a higher level
    }
};

/**
 * Sends an email receipt to the user upon successful payment.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {Error} - If request data is invalid or there is an error sending the email.
 */
exports.sendReceipt = onRequest((req, res) => {
  try {
    cors(req, res, async () => {
        // Basic request validation
        const { uid } = req.body || {};
        if (!uid) {
          throw new Error('Invalid request data. UID required.');
        }
        // Fetch payment data
        const { displayName, email, amount, orderID, conferenceCode } = await getPaymentData(uid, req.body.paymentID);

        const params = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                  Text: {
                      Data: `Dear ${displayName}\n\n This email is to confirm the receipt of $${amount} USD as payment for the HPAIR ${conferenceCode} conference. Your payment id is ${orderID}`,
                  },
                },
                Subject: {
                Data: 'Payment Receipt',
                },
            },
            Source: SENDER,
        };

        ses.sendEmail(params).promise()
            .then(() => {
                res.status(200).send(`Email sent successfully to ${displayName} at ${email}`);
            })
            .catch((error) => {
                console.error(`Req: ${req.body}, Error sending email: ${error}`);
                res.status(500).send('Error sending email');
            });
    });
  } catch (error) {
    console.error(`Req: ${req.body}, Error sending email: ${error}`);
    res.status(500).send('Error sending email');
  }
});
