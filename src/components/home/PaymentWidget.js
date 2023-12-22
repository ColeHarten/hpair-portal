import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from 'react';
import { CLIENT_ID } from '../../config/Config';
import { addConferenceCode, addPaymentInfo } from '../../utils/mutations';
import axios from 'axios';

export default function PaymentWidget({user, joinCode, price}){

     // creates a paypal order
    const createOrder = async (data, actions) => {        
        return actions.order.create({
            purchase_units: [
                {
                    description: `Conference Code: ${joinCode}`, 
                    amount: {
                        currency_code: "USD",
                        value: price,
                    },
                },
            ],
            application_context: {
                shipping_preference: "NO_SHIPPING",
            }
        }).then((orderID) => {
            return orderID;
        });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            const { payer } = details;
            // add user to conference
            await addConferenceCode(user, joinCode, details.id);

            // add payment info to payments collection
            await addPaymentInfo(user, {
                amount: details.purchase_units[0].amount.value,
                currency: details.purchase_units[0].amount.currency_code,
                joinCode: joinCode,
                payerID: payer.payer_id,
                orderID: details.id,
            });
            // Send the receipt of payment
            const firebaseFunctionUrl = 'https://sendemail-2t5cbdn56q-uc.a.run.app';
            const postData = {
                uid: user.uid,
                paymentID: details.id,
            };
            try {
                await axios.post(firebaseFunctionUrl, postData);
                console.log('Post successful');
            } catch (error) {
                console.error('Error:', error.message);
            }
            // refresh page to update user info
            window.location.reload();
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        console.error(data, actions)
    };

    return (
        // add a price amount 
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID}}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
            />
        </PayPalScriptProvider>
    );
}