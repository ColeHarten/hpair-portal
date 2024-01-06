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
import { updateConference } from '../../../utils/mutations/conferences';
import React, { useState } from 'react';
import { Conference } from '../../../utils/types';

interface Props {
  conference: Conference;
}

export default function AdminConferenceEditConferenceModal({ conference }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});

  const [conferenceName, setConferenceName] = useState<string>(conference?.conferenceName || '');

  const [editedLabels, setEditedLabels] = useState<string[]>(Object.keys(conference?.prices || []));
  const [editedValues, setEditedValues] = useState<number[]>(Object.values(conference?.prices || []));

  const resetState = async () => {
    setEditing({});
    setConferenceName(conference?.conferenceName || '');
    setEditedLabels(Object.keys(conference?.prices || []));
    setEditedValues(Object.values(conference?.prices || []));
  };

  const handleUpdateConference = () => {
    if(conferenceName === ''){
      alert("Conference name cannot be empty!");
      return;
    }

    if(editedLabels.includes("")){
      alert("Price labels cannot be empty!");
      return;
    }

    // prompt user for password
    const password = prompt("Please enter your password to confirm changes:");
    if(password !== "admin123") {alert("Incorrect password!"); return;}

    // stitch together the edited labels and values into a single Record
    const editedPrices = editedLabels.reduce((obj, label, index) => {
      obj[label] = editedValues[index];
      return obj;
    }, {} as Record<string, number>);

    const updatedConference = {
      conferenceCode : conference.conferenceCode,
      registrants : conference.registrants ?? 0,
      conferenceName : conferenceName,
      prices: editedPrices,
    }; 
    
    // update the conference in the database
    updateConference(updatedConference);

    // close the modal
    setOpen(false);
    resetState();
  };

  const handleAddPrice = () => {
    const count = editedLabels.length;
    setEditedLabels((prevLabels) => [...prevLabels, '']);
    setEditedValues((prevValues) => [...prevValues, 0]);
    setEditing((prevEditing) => ({ ...prevEditing, ['label'+count]: true, ['value'+count]: true }));
  };

  const handleRemovePrice = (index: number) => {
    if(editedLabels.length === 1) {return;}

    const updatedLabels = [...editedLabels];
    const updatedValues = [...editedValues];

    updatedLabels.splice(index, 1);
    updatedValues.splice(index, 1);

    setEditedLabels(updatedLabels);
    setEditedValues(updatedValues);

    // Optionally, you can also update the editing state
    const updatedEditing = { ...editing };
    delete updatedEditing['label'+index];
    delete updatedEditing['value'+index];
    setEditing(updatedEditing);
  };

  const handlePriceChange = (index: number, type: string, value: string) => {
    if (type === 'label') {
      if (!value.match(/[A-Z]/) && value !== "") { return; }

      setEditedLabels((prevLabels: string[]) => {
        const updatedLabels = [...prevLabels];
        updatedLabels[index] = value;
        return updatedLabels;
      });

    } else if (type === 'value'){
      if(isNaN(Number(value))) { return; }

      setEditedValues((prevValues: number[]) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = Number(value);
        return updatedValues;
      });

    }
  };

  const handleToggleEditing = (key: string) => {
    setEditing((prevEditing) => ({ ...prevEditing, [key]: !prevEditing[key] }));
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog onClose={() => {
                setOpen(false);
                resetState();
              }} 
              open={open} 
              maxWidth="md" 
              fullWidth
      >
        <Box style={{ padding: '20px' }}>
          <DialogTitle component="span" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">{conference.conferenceCode}</Typography>
            <IconButton edge="end" color="inherit" onClick={() => {setOpen(false); resetState();}} aria-label="close">
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
              value={editing['conferenceName'] ? conferenceName : conference?.conferenceName || ''}
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

            {editedLabels.map((label, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label={`Price Label ${index+1}`}
                  variant="outlined"
                  value={label}
                  required
                  onChange={(e) => handlePriceChange(index, 'label', e.target.value)}
                  inputProps={{
                    maxLength: 1,
                  }}
                  disabled={!editing['label'+index]}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleToggleEditing('label'+index)}>
                          <EditIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={`Price Value ${index+1}`}
                  variant="outlined"
                  value={editedValues[index]}
                  required
                  onChange={(e) => handlePriceChange(index, 'value', e.target.value)}
                  disabled={!editing['value'+index]}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleToggleEditing('value'+index)} sx={{ borderRadius: '50%' }}>
                          <EditIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>$</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton onClick={() => handleRemovePrice(index)}>
                  <CloseIcon />
                </IconButton>
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
