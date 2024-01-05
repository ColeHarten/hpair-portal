import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Conference } from '../../../utils/types';

interface Props {
  conference: Conference;
}

export default function AdminConferenceEditConferenceModal({ conference }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [conferenceName, setConferenceName] = useState<string>(conference?.conferenceName || '');
  const [conferenceCode, setConferenceCode] = useState<string>(conference?.conferenceCode || '');
  const [prices, setPrices] = useState<Record<string, number>>(conference?.prices || {});

  const handleUpdateConference = () => {
    console.log('Conference Name:', conferenceName);
    console.log('Conference Code:', conferenceCode);
    console.log('Prices:', prices);

    if (conferenceCode.length !== 7) {
      alert('Conference code must be 7 characters long.');
      return;
    }
    if (conferenceName.length === 0) {
      alert('Conference name cannot be empty.');
      return;
    }
    // Check if any price is undefined
    if (Object.values(prices).some((price) => price === undefined)) {
      alert('Prices cannot be empty.');
      return;
    }

    setOpen(false);
  };

  const handleAddPrice = () => {
    const updatedPrices = { ...prices, [`label${Object.keys(prices).length + 1}`]: 0 };
    setPrices(updatedPrices);
  };

  const handlePriceChange = (key: string, value: string) => {
    // If the key is not an uppercase letter, throw an error
    if (key.startsWith('label') && !value.match(/[A-Z]/) && value.length !== 0) {
      return;
    }

    const updatedPrices = { ...prices, [key]: Number(value) };
    setPrices(updatedPrices);
  };

  const handleRemovePrice = (key: string) => {
    const { [key]: removedPrice, ...updatedPrices } = prices;
    setPrices(updatedPrices);
  };

  const handleToggleEditing = (key: string) => {
    setEditing((prevEditing) => ({ ...prevEditing, [key]: !prevEditing[key] }));
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog onClose={() => setOpen(false)} open={open} maxWidth="md" fullWidth>
        <Box style={{ padding: '20px' }}>
          <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">Edit Conference</Typography>
            <IconButton edge="end" color="inherit" onClick={() => setOpen(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Conference Name"
              variant="outlined"
              value={conferenceName}
              required
              onChange={(e) => setConferenceName(e.target.value)}
              disabled={!editing['conferenceName']}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleToggleEditing('conferenceName')}>
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Conference Code"
              variant="outlined"
              value={conferenceCode}
              required
              onChange={(e) => setConferenceCode(e.target.value)}
              inputProps={{
                maxLength: 7,
              }}
              disabled={!editing['conferenceCode']}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleToggleEditing('conferenceCode')}>
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {Object.entries(prices).map(([key, value]) => (
              <Box key={key} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label={`Price Label ${key.slice(-1)}`}
                  variant="outlined"
                  value={key}
                  required
                  onChange={(e) => handlePriceChange(key, e.target.value)}
                  inputProps={{
                    maxLength: 1,
                  }}
                  disabled={!editing[key]}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleToggleEditing(key)}>
                          <EditIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={`Price Value ${key.slice(-1)}`}
                  variant="outlined"
                  value={value}
                  type="number"
                  required
                  onChange={(e) => handlePriceChange(key, e.target.value)}
                  disabled={!editing[key]}
                />
                {editing[key] && <IconButton onClick={() => handleRemovePrice(key)} sx={{ borderRadius: '50%' }}>
                  <CloseIcon />
                </IconButton>}
              </Box>
            ))}
            <Button variant="outlined" onClick={handleAddPrice}>
              Add Price
            </Button>
          </DialogContent>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button variant="contained" onClick={handleUpdateConference}>
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
