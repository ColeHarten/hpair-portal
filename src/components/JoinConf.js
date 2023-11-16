import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, TextField, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { sha1 } from 'crypto-hash';
import React, { useState } from 'react';
import MENU_ITEMS from '../constants';
import { isValidConfCode } from '../utils/mutations';
import PaymentWidget from './PaymentWidget';

export default function JoinConf ({ user, onMenuButtonClick }) {
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

  function isCorrectFormat(input) {
    const regex = /^[A-Za-z0-9]{6}-[A-Za-z0-9]{6}$/;
    return regex.test(input);
  }
  // validate conference codes
  const validateJoinCode = async (joinCode, email) => {
    // check if conference code is valid
    let result = await sha1(email.toLowerCase());
    // if the user input matches the last 6 characters of the sha1 hash of their email
    // then it is valid

    // This is not injective but the probability of collision is ~1/(16^6)
    // ! WE MAY WANT TO CHECK THAT THIS IS NOT VISIBLE TO USER (but prolly not that deep tbh)
    return  await(isValidConfCode(joinCode.slice(0,6))) &&
            (result.slice(-6) === joinCode.slice(-6) || 
             joinCode.slice(-6) === "HU2024");
  }
    
  // on submit click
  const handleJoinConf = async (joinCode) => {
    // add conference code to user doc
    const isValid = await validateJoinCode(joinCode, user.email)
    if(isValid){
      setShowPayment(true)
    } else{
      alert("Invalid Join Code. Please verify the code is correct. If you are still having issues, please reach out to conference support.")
    }
  }

  function handleClickJoin() {
    console.log(user)
    if (isCorrectFormat(joinCode)) {
      // Open the PaymentModal
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
      <Box>
        <Typography variant="h6" style={{ margin: '8px 0' }}>
          Please complete payment to join conference.
        </Typography>
        <PaymentWidget user={user} joinCode={joinCode} />
        <Button
         variant="contained" color="secondary"
          onClick={() => setShowPayment(false)} // Go back to the sign-in form
          // style={{ marginTop: '8px', backgroundColor: 'transparent', color: 'white' }}
        >Return</Button>
      </Box>
    ) : (
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
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleClickJoin} style={{ marginTop: '8px' }}>
          To Payment
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => onMenuButtonClick(MENU_ITEMS.LOGOUT) } // Go back to the sign-in form
          style={{ marginTop: '8px', backgroundColor: 'transparent', color: 'white' }}
        >
          Sign out
        </Button>
      </>
    )}
    </Box>
  );
}