import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from 'react';
import { CLIENT_ID } from '../config/Config';
import { addConferenceCode, addPaymentInfo } from '../utils/mutations';

export default function PaymentWidget({user, joinCode, navigate}){
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: `Conference Code: ${joinCode}`, 
                    amount: {
                        currency_code: "USD",
                        value: 5,
                    },
                },
            ],
        }).then((orderID) => {
            setOrderID(orderID);
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
                amount: 5,
                currency: "USD",
                joinCode: joinCode,
                payerID: payer.payer_id,
            });
            console.log(payer);
            setSuccess(true);
            // redirect to conference page
            // refresh page
            window.location.reload();
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };


    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
            />
        </PayPalScriptProvider>
    )
}