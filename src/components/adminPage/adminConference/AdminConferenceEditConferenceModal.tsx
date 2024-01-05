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

  const [editedLabels, setEditedLabels] = useState<string[]>(Object.keys(conference?.prices || []));
  const [editedValues, setEditedValues] = useState<number[]>(Object.values(conference?.prices || []));

  const handleUpdateConference = () => {
    // Your implementation here

    setOpen(false);
  };

  const handleAddPrice = () => {
    const newLabel = '';
    setEditedLabels((prevLabels) => [...prevLabels, newLabel]);
    setEditedValues((prevValues) => [...prevValues, 0]);
    setEditing((prevEditing) => ({ ...prevEditing, [newLabel + 'label']: true, [newLabel + 'value']: true }));
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
    delete updatedEditing[index + 'label'];
    delete updatedEditing[index + 'value'];
    setEditing(updatedEditing);
  };

  const handlePriceChange = (index: number, type: string, value: string) => {
    if (type === 'label') {
      if (!value.match(/[A-Z]/)) { return; }

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
    setEditing((prevEditing) => ({ ...prevEditing, [index + type]: true }));
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
            <TextField
              fullWidth
              margin="normal"
              label="Conference Code"
              variant="outlined"
              value={editing['conferenceCode'] ? conferenceCode : conference?.conferenceCode || ''}
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

            {editedLabels.map((label, index) => (
              <Box key={label} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
                  disabled={!editing[index + 'label']}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleToggleEditing(index + 'label')}>
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
                  disabled={!editing[index + 'value']}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleToggleEditing(index + 'value')} sx={{ borderRadius: '50%' }}>
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
