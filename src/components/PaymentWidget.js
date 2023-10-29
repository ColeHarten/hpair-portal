import { useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CLIENT_ID } from '../config/Config'
import { addConferenceCode } from '../utils/mutations';
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
                        value: 20,
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
            // add user to conference
            addConferenceCode(user, joinCode.slice(0,6));
            // redirect to conference page
            navigate(`/conference/${joinCode.slice(0,6)}`); // the first 6 characters of the join code are the conference code
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
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