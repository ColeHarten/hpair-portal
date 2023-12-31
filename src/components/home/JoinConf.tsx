import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, TextField, Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { sha256 } from 'crypto-hash';
import React, { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { getConferenceData} from '../../utils/mutations/conferences';
import { addConferenceCode, isValidConfCode, isValidTicketClass } from '../../utils/mutations/users';
import PaymentWidget from './PaymentWidget';
import type { Conference, User } from '../../utils/types';

interface JoinConfProps {
  user: User;
}

export default function JoinConf({ user }: JoinConfProps): JSX.Element {
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null); // Assuming price is a number, change it accordingly
  const [isShowTerms, setIsShowTerms] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  
  const textFieldStyles = {
    container: {
      margin: '8px 0',
      backgroundColor: 'transparent',
      color: 'white',
      width: '100%',
    },
    input: {
      color: 'white',
    },
    label: {
      color: 'white',
    },
  };

  // Only show terms for HCONF
  useEffect(() => {
    // if first 7 chars are HCONF24
    if(joinCode.slice(0,7) === "HCONF24"){
      setIsShowTerms(true);
    } else{
      setIsShowTerms(false);
    }
  }, [joinCode])

  // TODO: Move this validation into a firebase function to hide it from the client
  function isCorrectFormat(input : string) : boolean {
    // Check if input is in the format XXXXXX-X-XXXXXX
    const regex = /^[A-Za-z0-9]{7}-[A-Za-z0-9]{1}-[A-Za-z0-9]{6}$/;
    return regex.test(input);
  }
  // validate conference codes
  const validateJoinCode = async (joinCode : string, email : string) : Promise<boolean> => {
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
const handleJoinConf = async (joinCode: string): Promise<void> => {
  // add conference code to user doc
  const isValid: boolean = await validateJoinCode(joinCode, user.email);
  if (isValid) {
    if (joinCode.split('-')[1] === "F") {
      await addConferenceCode(user.uid, joinCode, "N/A");
      // refresh page to update user info
      window.location.reload();
    } else {
      const confData: Conference | null = await getConferenceData(joinCode.slice(0, 7));
      if (confData && confData.prices) {
        await setPrice(confData.prices[joinCode.split('-')[1]]);
        setShowPayment(true);
      } else {
        console.error("Error fetching conference data.");
      }
    }
  } else {
    alert("Invalid Join Code. Please verify the code is correct. If you are still having issues, please reach out to conference support.");
  }
};


  function handleClickJoin() : void {
    if(!isShowTerms || isVerified){
      if (isCorrectFormat(joinCode)) {
        // Open the PaymentWidget
        handleJoinConf(joinCode);
      }else{
        alert("Invalid Join Code. Please verify the code is correct. If you are still having issues, please reach out to conference support.")
      }
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
        <Typography variant="body1" style={{ margin: '8px 0' }}>
          Please complete payment of ${price} USD to join conference.
        </Typography>
        <PaymentWidget user={user} joinCode={joinCode} price={price} />
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
        {isShowTerms && <Box sx={{display: 'flex'}}>
        <Checkbox size="small" color="secondary" onChange={(e) => setIsVerified(e.target.checked)} sx={{borderRadius: '50%'}} />
        <Typography variant="body2">By checking this box, you are confirming that you have read and understood the <a style={{ textDecoration: 'none', color: '#6e8eb8' }} href="/documents/terms_and_conditions.html" target="_blank">Terms and Conditions.</a></Typography>
        </Box> }
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
