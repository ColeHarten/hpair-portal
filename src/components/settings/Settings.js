import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../../utils/firebase';

export default function SettingsPage({ user }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);

  const { reauthenticateWithPassword, updatePassword } = useAuth();

  const handleChangePassword = async () => {
    try {
      if (newPassword === confirmPassword) {
        await reauthenticateWithPassword(user, oldPassword);
        await updatePassword(user, newPassword);
        alert("Password successfully changed.");
      } else {
        alert("New passwords do not match.");
      }
    } catch (error) {
      alert("Please verify your old password is correct.");
      setError(true);
    }
  };

  const {confCode} = useParams();
  const navigate = useNavigate();

  const onBack = async () => {
    // go back to conference page using the params from the url
    navigate(`/${confCode}`)
  }

  return (
  <Box
  component="main"
  sx={{
    backgroundColor: (theme) =>
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column', // Stack contents vertically
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  }}
>
  <Paper
    sx={{
      width: '30%',      // Take up 1/3 of the width
      minWidth: '350px', // But at least 300px
      p: 2,              // Add some padding
      display: 'flex',   // Use Flexbox to center content
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 64px)',
    }}>
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Typography variant="h5">Change Password</Typography>
        <TextField
          label="Old Password"
          type="password"
          margin="normal"
          variant="outlined"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          margin="normal"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          margin="normal"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Typography variant="body2" color="error">{error}</Typography>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
            sx={{
              marginTop: "20px",
            }}
          >
            Change Password
          </Button>
          <Button
            variant="contained"
            color="primary" // Customize the background color
            onClick={onBack}
            sx={{
              marginTop: "10px",
              backgroundColor: "lightgray", // Customize the background color
            }}
          >
            Return
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
