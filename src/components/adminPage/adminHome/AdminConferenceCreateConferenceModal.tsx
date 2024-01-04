import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';

export default function AdminConferenceCreateConferenceModal() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button startIcon={<AddCircleOutlineIcon />} onClick={() => setOpen(true)} sx={{color:'black'}}
      >Create Conference
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open} maxWidth="md" fullWidth>
        <Box style={{ padding: '20px' }}>
          <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">Create Conference</Typography>
            <IconButton edge="end" color="inherit" onClick={() => setOpen(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>

          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};
