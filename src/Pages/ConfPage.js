import React from 'react';
import { Typography, Box, Paper, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import QRCodeCanvas from "qrcode.react";

export default function ConfPage({ user }) {
  const confID = useParams().confID;

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={user.uid}
      size={300}
      bgColor={"#ffffff"}
      level={"H"}
    />
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={2}
    >
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h4" align="center">
            Welcome to HPAIR {confID} Conference
          </Typography>
          <Typography variant="h6" align="center">
            Here is your QR code!
          </Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            {qrcode}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
