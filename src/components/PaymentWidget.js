import { useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CLIENT_ID } from '../config/Config'
import { addConferenceCode, addPaymentInfo } from '../utils/mutations';
import { useState } from 'react';

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
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            console.log("Payment Successful!");
            // add user to conference
            addConferenceCode(user, joinCode.slice(0,6));
            // add payment info to payments collection
            addPaymentInfo(user, {
                amount: 5,
                currency: "USD",
                joinCode: joinCode,
            });
            // redirect to conference page
            // refresh page
            window.location.reload();
        }
    },[success]);

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