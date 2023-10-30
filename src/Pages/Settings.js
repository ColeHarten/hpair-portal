import React, { useState } from "react";
import { Typography, Paper, TextField, Button, FormControl } from "@mui/material";
import { useAuth } from '../utils/firebase'; // Import the auth functions from your Firebase module

export default function SettingsPage({ user }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { reauthenticateWithPassword, updatePassword } = useAuth(); // Use the auth functions from your Firebase module

  const handleChangePassword = async () => {
    try {
      if (newPassword === confirmPassword) {
        const credentials = await reauthenticateWithPassword(user, oldPassword); // Reauthenticate the user
        await updatePassword(user, newPassword); // Update the password
        // Password changed successfully
        console.log("Password changed successfully");
        setError(null);
      } else {
        alert("New passwords do not match.");
      }
    } catch (error) {
      alert("Please verify your old password is correct.")
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h4">Change Password</Typography>
      <FormControl>
        <TextField
          label="Old Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
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
          style={{ marginTop: "20px" }}
        >
          Change Password
        </Button>
      </FormControl>
    </Paper>
  );
}
