import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from 'axios';
import React from 'react';
import { CLIENT_ID } from '../../config/Config';
import { addConferenceCode, addPaymentInfo } from '../../utils/mutations';
import type { Payment, User } from '../../utils/types';

interface PaymentWidgetProps {
  user: User;
  joinCode: string;
  price: number | null;
}

const PaymentWidget: React.FC<PaymentWidgetProps> = ({ user, joinCode, price }: PaymentWidgetProps) => {
    // creates a paypal order
    const createOrder = async (_: any, actions: any) => {
        if(!price) throw new Error("Price is undefined");
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
            },
            }).then((orderID: string) => {
            return orderID;
        });
    };

    // check Approval
    const onApprove = (_: any, actions: any) => {
        return actions.order.capture().then(async (details: any) => {
        const { payer } = details;

        // add user to conference
        await addConferenceCode(user.uid, joinCode, details.id);

        const payment : Payment = {
            amount: details.purchase_units[0].amount.value,
            currency: details.purchase_units[0].amount.currency_code,
            joinCode: joinCode,
            payerID: payer.payer_id,
            orderID: details.id,
            paymentTime: null,
            uid: user.uid,
        }
            
        // add payment info to payments collection
        await addPaymentInfo(payment);

        // Send the receipt of payment
        const firebaseFunctionUrl = 'https://sendemail-2t5cbdn56q-uc.a.run.app';
        const postData = {
            uid: user.uid,
            paymentID: details.id,
        };

        try {
            await axios.post(firebaseFunctionUrl, postData);
        } catch (error : any) {
            console.error('Error:', error.message);
        }

        // refresh page to update user info
        // window.location.reload();
        });
    };

    // capture likely error
    const onError: (err: any, actions?: any) => void = (data, actions) => {
        console.error(data, actions);
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
};

export default PaymentWidget;
