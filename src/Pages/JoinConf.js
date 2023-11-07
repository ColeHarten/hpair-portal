import React, { useState } from 'react';
import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {isValidConfCode} from '../utils/mutations';
import {sha1} from 'crypto-hash';
import PaymentWidget from '../components/PaymentWidget';

export default function JoinConf ({ user, navigate}) {
  const [showPayment, setShowPayment] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  
  function isCorrectFormat(input) {
    const regex = /^[A-Za-z0-9]{6}-[A-Za-z0-9]{6}$/;
    return regex.test(input);
  }
  // validate conference codes
  const validateJoinCode = async (joinCode, email) => {
    // check if conference code is valid
    let result = await sha1(email);
    // if the user input matches the last 6 characters of the sha1 hash of their email
    // then it is valid

    // This is not injective but the probability of collision is ~1/(16^6)
    // ! WE MAY WANT TO CHECK THAT THIS IS NOT VISIBLE TO USER
    return  await(isValidConfCode(joinCode.slice(0,6))) &&
            result.slice(-6) === joinCode.slice(-6);
  }
    
  // on submit click
  const handleJoinConf = async (joinCode) => {
    // add conference code to user doc
    const isValid = await validateJoinCode(joinCode, user.email)
    if(isValid){
      setShowPayment(true)
    } else{
      alert("Invalid Join Code. Please verify code entered and remember that you must use the same email you used to register for the conference. If you are still having issues, please reach out to conference support.")
    }
  }

  function handleClickJoin() {
    if (isCorrectFormat(joinCode)) {
      // Open the PaymentModal
      handleJoinConf(joinCode);
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
        // height: '100vh',
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
                <PaymentWidget user={user} joinCode={joinCode} />
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
          <TextField label="Conference Join Code" style={{ margin: '8px 0' }} onChange={(e) => setJoinCode(e.target.value)}/>
          <Button variant="contained" style={{ margin: '8px 0' }} onClick={handleClickJoin}>To Payment</Button>
          </>)}           
        </Box>
      </Paper>
    </Box>
  );
}
