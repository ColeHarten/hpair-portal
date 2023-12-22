import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { getPaymentInfo } from '../../../utils/mutations';

export default function AdminConferencePaymentModal({ orderID, open, onClose }) {
    const [paymentInfo, setPaymentInfo] = useState(null);
  
    useEffect(() => {
      if (open) {
        // Fetch payment information when the modal is opened
        getPaymentInfo(orderID).then((data) => {
          setPaymentInfo(data);
        });
      }
    }, [open, orderID]);
  
    return (
      <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
        <Box style={{ padding: '20px' }}>
          <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">Payment</Typography>
            <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography>Amount: ${paymentInfo?.amount}</Typography>
            <Typography>
              Time: {paymentInfo ? paymentInfo.paymentTime.toDate().toLocaleString() : ''}
            </Typography>
            <Typography>Join Code: {paymentInfo?.joinCode}</Typography>
            <Typography>Payer Id: {paymentInfo?.payerID}</Typography>
            <Typography>Order Id: {paymentInfo?.orderID}</Typography>
          </DialogContent>
        </Box>
      </Dialog>
    );
  }