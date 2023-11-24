import { Box, Paper, Typography } from "@mui/material";
import QRCodeCanvas from "qrcode.react";
import React, { useState } from 'react';
import { getConferenceData, getUserData } from '../../utils/mutations';
import MenuBar from "../menuBar/MenuBar";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import SettingsPage from "../settings/Settings";
import { auth } from '../../utils/firebase';
import MENU_ITEMS from "../../constants";
import SupportModal from "../supportModal/SupportModal";

export default function ConfPage({ user }) {
  const { confCode } = useParams();

  return (
    <Box>
      <Typography> {confCode} </Typography>
    </Box>
  );
}
