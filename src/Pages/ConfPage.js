import { Typography, Box } from "@mui/material";
import {useParams} from "react-router-dom";
import QRCodeCanvas from "qrcode.react";


export default function ConfPage({user}) {
    const confId = useParams().confID;

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
        // set up home screen
        <Box>
          <Typography variant="h1">Welcome to HPAIR</Typography>
          <Typography variant="h3">Please scan your QR code to sign in</Typography>
          <Box>{qrcode}</Box>
        </Box>
      );
}