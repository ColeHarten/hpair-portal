import React, { useState } from "react";
import { Typography, Paper, TextField, Button, FormControl } from "@mui/material";
import { useAuth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { getUserData } from "../utils/mutations";

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submitButton: {
    marginTop: "20px",
  },
  backButton: {
    marginTop: "10px",
    backgroundColor: "lightgray", // Customize the background color
  },
};

export default function SettingsPage({ user }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { reauthenticateWithPassword, updatePassword } = useAuth();
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      if (newPassword === confirmPassword) {
        const credentials = await reauthenticateWithPassword(user, oldPassword);
        await updatePassword(user, newPassword);
        console.log("Password changed successfully");
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
    if (!!data.conferenceCode) {
      navigate(`/conference/${data.conferenceCode}`);
    } else {
      navigate(`/join-conference`);
    }
  }

  return (
    <Paper elevation={3} style={styles.paper}>
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
        <div style={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
            style={styles.submitButton}
          >
            Change Password
          </Button>
          <Button
            variant="contained"
            color="primary" // Customize the background color
            style={styles.backButton}
            onClick={onBack}
          >
            Return
          </Button>
        </div>
      </FormControl>
    </Paper>
  );
}
