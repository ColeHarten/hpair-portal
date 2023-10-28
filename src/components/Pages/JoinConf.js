import React, { useState } from 'react';
import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CLIENT_ID } from '../../config/Config'
import { addConferenceCode } from '../../utils/mutations';
import {sha1} from 'crypto-hash';

export default function JoinConf ({ user, navigate}) {
    const [showPayment, setShowPayment] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

  const [conferenceCode, setConferenceCode] = useState('');
  
    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Sunflower",
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
            addConferenceCode(user, conferenceCode);
            // redirect to conference page
            navigate(`/conference/${conferenceCode}`);
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

  function isCorrectFormat(input) {
    const regex = /^[A-Za-z0-9]{6}-[A-Za-z0-9]{6}$/;
    return regex.test(input);
  }
  // validate conference codes
  const validateConferenceCode = async (conferenceCode, email) => {
    // check if conference code is valid
    let result = await sha1(email);
    // if the user input matches the last 6 characters of the sha1 hash of their email
    // then it is valid
    console.log(result.slice(-6))

    // This is not deterministic but the probability of collision is ~1/(16^6)
    // ! WE MAY WANT TO CHECK THAT THIS IS NOT VISIBLE TO USER
    return (result.slice(-6) === conferenceCode.slice(-6)) && 
            conferenceCode.slice(0, 6) === "CONF24";
  }
    
  // on submit click
  const handleJoinConf = async (conferenceCode) => {
    // add conference code to user doc
    console.log(user)
    let isValid = await validateConferenceCode(conferenceCode, user.email)
    if(isValid){
      setShowPayment(true)

    } else{
      alert("Invalid Conference Code. Please verify code entered and remember that you must use the same email you used to register for the conference. If you are still having issues, please reach out to conference support.")
    }
  }

  function handleClickJoin() {
    if (isCorrectFormat(conferenceCode)) {
      // Open the PaymentModal
      handleJoinConf(conferenceCode);
    }
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 2,
          height: 'auto',
        }}
      >
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}>
          {showPayment ? (<Box>
            <Typography variant="H6" style={{ margin: '8px 0' }}>
            Please complete payment to join conference.
            </Typography>
                <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                  <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                  />
                  </PayPalScriptProvider>
                  <Button variant="contained" onClick={() => setShowPayment(false)}>Return</Button>
              </Box>) :(<>
          <Typography variant="H6" style={{ margin: '8px 0' }}>
            Join Conference
            <Tooltip title="Please enter join code sent in email." arrow>
              <IconButton color="secondary" size="small">
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <TextField label="Conference Join Code" style={{ margin: '8px 0' }} onChange={(e) => setConferenceCode(e.target.value)}/>
          <Button variant="contained" style={{ margin: '8px 0' }} onClick={handleClickJoin}>To Payment</Button>
          </>)}           
        </Box>
      </Paper>
    </Box>
  );
}
