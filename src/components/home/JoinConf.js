import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, TextField, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { sha256 } from 'crypto-hash';
import React, { useState } from 'react';
import MENU_ITEMS from '../../constants';
import { isValidConfCode, isValidTicketClass, addConferenceCode } from '../../utils/mutations';
import PaymentWidget from './PaymentWidget';
import {auth} from '../../utils/firebase';

export default function JoinConf ({ user }) {
  const [showPayment, setShowPayment] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  
  const textFieldStyles = {
    container: {
      margin: '8px 0',
      backgroundColor: 'transparent',
      color: 'white',
    },
    input: {
      color: 'white',
    },
    label: {
      color: 'white',
    },
  };
  // TODO: Move this validation into a firebase function to hide it from the client
  function isCorrectFormat(input) {
    // Check if input is in the format XXXXXX-X-XXXXXX
    const regex = /^[A-Za-z0-9]{7}-[A-Za-z0-9]{1}-[A-Za-z0-9]{6}$/;
    return regex.test(input);
  }
  // validate conference codes
  const validateJoinCode = async (joinCode, email) => {
    // append the ticket class to the email and hash it
    const result = await sha256(email.toLowerCase()+joinCode.split('-')[1]);

    // if the user input matches the last 6 characters of the sha1 hash of their email
    // then it is valid

    return  (await isValidConfCode(joinCode.slice(0,7))) &&                             // check if conference code is valid
            (await isValidTicketClass(joinCode.slice(0,7), joinCode.split('-')[1])) &&  // check if ticket class is valid
                  (result.slice(-6) === joinCode.slice(-6) ||                           // validate the verification steps
                  joinCode.slice(-6) === "HU2024");
  }
    
  // on submit click
  const handleJoinConf = async (joinCode) => {
    // add conference code to user doc
    const isValid = await validateJoinCode(joinCode, user.email)
    if(isValid){
      if(joinCode.split('-')[1] === "F"){
        await addConferenceCode(user, joinCode, "N/A");
        // refresh page to update user info
        window.location.reload();
      } else{
        setShowPayment(true);
      }
    } else{
      alert("Invalid Join Code. Please verify the code is correct. If you are still having issues, please reach out to conference support.")
    }
  }

  function handleClickJoin() {
    if (isCorrectFormat(joinCode)) {
      // Open the PaymentWidget
      handleJoinConf(joinCode);
    }
  }

  return (
  <Box
  component="main"
  sx={{
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column', // Stack contents vertically
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  }}>
    {showPayment ? (
      // Show the PaymentWidget
      <Box>
        <Typography variant="h6" style={{ margin: '8px 0' }}>
          Please complete payment to join conference.
        </Typography>
        <PaymentWidget user={user} joinCode={joinCode} />
        <Button
          variant="contained" color="secondary"
          onClick={() => setShowPayment(false)} // Go back to the sign-in form
        >Return</Button>
      </Box>
    ) : (
      // Show the conference join code input form
      <>
        <Typography variant="h6" style={{ margin: '8px 0' }}>
          Join Conference
          <Tooltip title="Please enter join code sent in email." arrow>
            <IconButton color="secondary" size="small">
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <TextField
          label="Conference Join Code"
          variant='standard'
          style={textFieldStyles.container}
          InputProps={{
            style: textFieldStyles.input,
          }}
          InputLabelProps={{
            style: textFieldStyles.label,
          }}
          color="secondary"
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleClickJoin} style={{ marginTop: '8px' }}>
          To Payment
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => auth.signOut() } // Go back to the sign-in form
          style={{ marginTop: '8px', backgroundColor: 'transparent', color: 'white' }}
        >
          Sign out
        </Button>
      </>
    )}
    </Box>
  );
}
