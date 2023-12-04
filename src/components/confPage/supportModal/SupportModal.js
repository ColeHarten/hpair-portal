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
    <Dialog onClose={onClose} open={open}>
  <Box style={{ padding: '10px' }}>
    <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h5">Contact Support</Typography>
      <IconButton
        edge="end"
        color="inherit"
        onClick={onClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <Typography variant="body1">
          If you need assistance, please reach out to our support team.
        </Typography>
      </DialogContentText>
      <Typography variant="body1" component={'span'} style={{ fontWeight: 'bold' }}>
        Contact Information<br />
      </Typography>
      <Typography variant="body1" component="span">
        Email: <a href="mailto:help@hpair.org">help@hpair.org</a>
      </Typography>
    </DialogContent>
  </Box>
</Dialog>

  );
}
