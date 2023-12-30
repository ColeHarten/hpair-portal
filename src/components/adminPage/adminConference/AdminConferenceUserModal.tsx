import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getPaymentInfo } from '../../../utils/mutations/payments';
import { Payment, User } from '../../../utils/types';
import LaunchIcon from '@mui/icons-material/Launch';
import { removeUser } from '../../../utils/mutations/users';

interface Props {
  user : User | null;
}

const AdminConferenceUserModal: React.FC<Props> = ({ user } : Props) => {
  const [paymentInfo, setPaymentInfo] = useState<Payment | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const orderID : string | null = user?.paymentID ?? null;

  useEffect(() => {
    if (open && orderID) {
      // Fetch payment information when the modal is opened and orderID is available
      getPaymentInfo(orderID).then((data: Payment | null) => {
        if (data) {
          setPaymentInfo(data);
        } else {
          // Handle case where payment information is not found
          console.log(`Payment information for orderID ${orderID} not found`);
        }
      });
    }
  }, [open, orderID]);

  async function handleRemoveUser() {
    // Ask the user for a password
    const enteredPassword = prompt(`Please enter the name of the user you are trying to remove: ${user?.displayName}.`);
  
    // Check if the password is correct (you should replace 'correctPassword' with the actual correct password)
    if (enteredPassword === user?.displayName) {
      // Password is correct, proceed with removal
      if (user && user.uid && user.conferenceCode) {
        await removeUser(user.uid, user.conferenceCode);
        alert("User removed successfully!");
      }
    } else {
      // Incorrect password, display a message to the user
      alert("Incorrect password. User removal cancelled.");
    }
  }
  
  return (
    <>
    <IconButton onClick={() => setOpen(true)}>
      <LaunchIcon />
    </IconButton>
    <Dialog onClose={() => setOpen(false)} open={open} maxWidth="md" fullWidth>
    <Box style={{ padding: '20px' }}>
      <DialogTitle
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: '16px', // Add some right padding for the close button
        }}
      >
        <Typography variant="h5">{user?.displayName}</Typography>
        <IconButton edge="end" color="inherit" onClick={() => setOpen(false)} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography>Amount: ${paymentInfo?.amount}</Typography>
        <Typography>
          Time: {paymentInfo?.paymentTime?.toLocaleString() ?? ''}
        </Typography>
        <Typography>Join Code: {paymentInfo?.joinCode}</Typography>
        <Typography>Payer Id: {paymentInfo?.payerID}</Typography>
        <Typography>Order Id: {paymentInfo?.orderID}</Typography>
        <Button onClick={handleRemoveUser} style={{ alignSelf: 'flex-end', marginTop: '16px' }}>
          Remove User
        </Button>
      </DialogContent>
    </Box>
  </Dialog>
  </>
  );
};

export default AdminConferenceUserModal;
