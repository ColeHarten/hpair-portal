import { Typography, Box } from "@mui/material";
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
    <Box>
      <Typography variant="h1">Welcome to HPAIR {confID} conference</Typography>
      <Typography variant="h3">Here is your QR code!</Typography>
      <Box>{qrcode}</Box>
      <img src="../../../HCONF-2024-Banner.png" alt="Your Image Description" />
    </Box>
  );
}
