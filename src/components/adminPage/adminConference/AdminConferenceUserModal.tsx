import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getPaymentInfo } from '../../../utils/mutations/payments';
import { Payment, User } from '../../../utils/types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { removeUser } from '../../../utils/mutations/users';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

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
          console.error(`Payment information for orderID ${orderID} not found`);
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
        <MoreHorizIcon />
      </IconButton>
      <Dialog onClose={() => setOpen(false)} open={open} maxWidth="md" fullWidth>
        <Box style={{ padding: '20px' }}>
          <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">{user?.displayName}</Typography>
            <IconButton edge="end" color="inherit" onClick={() => setOpen(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      UID:
                    </TableCell>
                    <TableCell>{user?.uid}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Amount:
                    </TableCell>
                    <TableCell>${paymentInfo?.amount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Time:
                    </TableCell>
                    <TableCell>{paymentInfo?.paymentTime?.toLocaleString() ?? ''}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Join Code:
                    </TableCell>
                    <TableCell>{paymentInfo?.joinCode ?? 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Payer Id:
                    </TableCell>
                    <TableCell>{paymentInfo?.payerID}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Order Id:
                    </TableCell>
                    <TableCell>{paymentInfo?.orderID}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <Button onClick={handleRemoveUser}>
                Remove User
              </Button>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default AdminConferenceUserModal;