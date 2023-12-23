const { onRequest } = require("firebase-functions/v2/https");
const AWS = require('aws-sdk');
const cors = require('cors')({origin: true});

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./aws-config');
const admin = require('firebase-admin');
admin.initializeApp();

const AWS_REGION = "us-east-2";
const SENDER = "Harvard Project for Asian and International Relations <help@hpair.org>";

const ses = new AWS.SES({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const getData = async (uid, paymentID) => {
  const db = admin.firestore();

  try {
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      throw new Error(`User document does not exist for uid: ${uid}`);
    }

    const paymentDoc = await db.collection('payments').doc(paymentID).get();

    if (!paymentDoc.exists) {
      throw new Error(`Payment document does not exist for paymentID: ${paymentID}`);
    }

    const { displayName, email, conferenceCode } = userDoc.data();
    const { amount, orderID } = paymentDoc.data();

    return { displayName, email, amount, orderID, conferenceCode };
  } catch (error) {
    console.error('Error fetching payment data:', error.message);
    throw error; // Re-throw the error for handling at a higher level
  }
};

exports.sendReceipt = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Basic request validation
      const { uid, paymentID } = req.body || {};
      if (!uid || !paymentID) {
        throw new Error('Invalid request data. Uid and paymentID are required.');
      }

      const {  displayName, email, amount, orderID, conferenceCode } = await getData(uid, paymentID);

      const params = {
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Text: {
              Data: `Dear ${displayName},\n\nThank you for your payment of $${amount} for the ${conferenceCode} conference. Your order ID is ${orderID}.\n\nBest`,
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
          res.status(200).send(`Email sent successfully to ${uid} at ${uid}`);
        })
        .catch((error) => {
          console.error(`Req: ${req.body}, Error sending email: ${error}`);
          res.status(500).send('Error sending email');
        });
    } catch (error) {
      console.error(`Req: ${req.body}, Error sending email: ${error}`);
      res.status(500).send('Error sending email');
    }
  });
});
