/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

import AWS_ACCESS_KEY_ID from './aws-config';
import AWS_SECRET_ACCESS_KEY from './aws-config';

// Create and deploy your first functions
const functions = require('firebase-functions');
const AWS = require('aws-sdk');


AWS_REGION = "us-east-2"
SENDER = "Harvard Project for Asian and International Relations <help@hpair.org>"

const ses = new AWS.SES({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });

exports.sendEmail = functions.https.onRequest(async (req, res) => {
// Extract recipient email and name from the request
const { name,email } = req.body; // Assuming the request body contains email and name

const params = {
    Destination: {
    ToAddresses: [email], // Use the recipient's email from the request
    },
    Message: {
    Body: {
        Text: {
        Data: `Hello ${name},\n\nThank you for your payment! This is your receipt.\n\n[Include receipt details here]`, // Customize the email content with receipt details
        },
    },
    Subject: {
        Data: 'Payment Receipt', // Customize the email subject
    },
    },
    Source: SENDER,
};

try {
    await ses.sendEmail(params).promise();
    res.status(200).send('Email sent successfully');
} catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
}
});