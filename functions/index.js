/*
    THIS IS A FIREBASE FUNCTION TO SEND OUT THE EMAIL RECEIPT UPON SUCCESSFUL PAYMENT
*/

const { onRequest } = require("firebase-functions/v2/https");
const AWS = require('aws-sdk');
const cors = require('cors')({origin: true});
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./aws-config');

const AWS_REGION = "us-east-2";
const SENDER = "Harvard Project for Asian and International Relations <help@hpair.org>";

const ses = new AWS.SES({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

// TODO: Rather than pass all of the info, pass only the uid and look it up in the db
exports.sendEmail = onRequest((req, res) => {
  try {
    cors(req, res, async () => {
        // Basic request validation
        const { name, email, amount, id } = req.body || {};
        if (!name || !email || !amount || !id) {
          throw new Error('Invalid request data. Name and email are required.');
        }

        const params = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                  Text: {
                      Data: `Dear ${name}\n\n This email is to confirm the reciept of $${amount} USD as payment for the HPAIR conference. Your id is ${id}`,
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
                res.status(200).send(`Email sent successfully to ${name} at ${email}`);
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
