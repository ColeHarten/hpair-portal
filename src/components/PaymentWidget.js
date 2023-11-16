import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CLIENT_ID } from '../config/Config';
import { addConferenceCode, addPaymentInfo, getConferenceData } from '../utils/mutations';
import React from 'react';

export default function PaymentWidget({user, joinCode}){
     // creates a paypal order
    const createOrder = async (data, actions) => {
        // get the price of the conference
        const confData = await getConferenceData(joinCode.slice(0,6));
        const price = confData.price;

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
                shipping_preference: "NO_SHIPPING"
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
            await addConferenceCode(user, joinCode.slice(0,6));
            // add payment info to payments collection
            await addPaymentInfo(user, {
                amount: details.purchase_units[0].amount.value,
                currency: details.purchase_units[0].amount.currency_code,
                joinCode: joinCode,
                payerID: payer.payer_id,
                orderID: details.id,
            });
            // refresh page to update user info
            window.location.reload();
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        console.error(data, actions)
    };

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                shippingPreference="NO_SHIPPING"
            />
        </PayPalScriptProvider>
    );
}