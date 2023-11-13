import { Box, Paper, Typography } from "@mui/material";
import QRCodeCanvas from "qrcode.react";
import React, { useState } from 'react';
import { getConferenceData, getUserData } from '../utils/mutations';

export default function ConfPage({ user }) {
  const [confName, setConfName] = useState(null);

  React.useEffect(() => {
    async function fetchData() {
      if(user){
        const userData = await getUserData(user);
        const data = await getConferenceData(userData?.conferenceCode);
        setConfName(data?.conferenceName);
      }
    }
    fetchData();
  }, [user]);

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={user?.uid}
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
      padding={2}
    >
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h4" align="center">
            Welcome to {confName} Conference
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
