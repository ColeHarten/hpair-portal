import React, { useState } from "react";
import { Typography, Paper, TextField, Button, Box } from "@mui/material";
import { useAuth } from '../utils/firebase';
import { getUserData } from "../utils/mutations";

export default function SettingsPage({ user, setCurrentPage }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { reauthenticateWithPassword, updatePassword } = useAuth();

  const handleChangePassword = async () => {
    try {
      if (newPassword === confirmPassword) {
        await reauthenticateWithPassword(user, oldPassword);
        await updatePassword(user, newPassword);
        alert("Password successfully changed.");
        setError(null);
      } else {
        alert("New passwords do not match.");
      }
    } catch (error) {
      alert("Please verify your old password is correct.");
    }
  };

  const onBack = async () => {
  //  if use is in a confernece redirec to their conference pagez
    const data = await getUserData(user);
    if (data?.conferenceCode) {
      // if we have a conference code, go to the conference page
      setCurrentPage(2);
    } else {
      // otherwise, go to the join conference page
      setCurrentPage(1);
    }
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
      width: '30%',     // Take up 1/3 of the width
      minWidth: '350px', // But at least 300px
      p: 2,              // Add some padding
      display: 'flex',   // Use Flexbox to center content
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 64px)',
    }}
  >
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
