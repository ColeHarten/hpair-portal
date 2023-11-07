import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import * as React from 'react';

export default function SupportModal({ onClose, open }) {
  return (
    <Dialog onClose={onClose} open={open} style={{overflow: 'hidden'}}>
      <Box style={{padding: '20px'}}>
        <DialogTitle>
          <Typography variant="h5">Contact Customer Support</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            style={{ position: 'absolute', top: '5px', right: '5px' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflow: 'hidden' }}>
          <DialogContentText>
            <Typography variant="body1">
              If you need assistance, please reach out to our support team.
            </Typography>
          </DialogContentText>
          <Typography variant="body1" component={"span"}>
            <strong>Contact Information:</strong>
          </Typography>
          <Typography variant="body1">Email: support@example.com</Typography>
          <Typography variant="body1">Phone: +1 (123) 456-7890</Typography>
          <Typography variant="body1">Operating Hours: Monday to Friday, 9:00 AM - 5:00 PM (EST)</Typography>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
