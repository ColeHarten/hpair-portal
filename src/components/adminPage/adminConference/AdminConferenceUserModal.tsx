import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getPaymentInfo } from '../../../utils/mutations/payments';
import { Payment, User } from '../../../utils/types';
import LaunchIcon from '@mui/icons-material/Launch';

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
  
  return (
    <>
    <IconButton onClick={() => setOpen(true)}>
                  <LaunchIcon />
                </IconButton>
    <Dialog onClose={()=>setOpen(false)} open={open} maxWidth="md" fullWidth>
      <Box style={{ padding: '20px' }}>
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">{user?.displayName}</Typography>
          <IconButton edge="end" color="inherit" onClick={()=>setOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>Amount: ${paymentInfo?.amount}</Typography>
          <Typography>
            Time: { paymentInfo?.paymentTime?.toLocaleString() ??  '' }
          </Typography>
          <Typography>Join Code: {paymentInfo?.joinCode}</Typography>
          <Typography>Payer Id: {paymentInfo?.payerID}</Typography>
          <Typography>Order Id: {paymentInfo?.orderID}</Typography>
        </DialogContent>
      </Box>
    </Dialog>
  </>
  );
};

export default AdminConferenceUserModal;
