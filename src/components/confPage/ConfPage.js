import { Box, Typography } from "@mui/material";
import React from 'react';
import { useParams } from "react-router-dom";

export default function ConfPage({ user }) {
  const { confCode } = useParams();

  return (
    <Box>
      <Typography> {confCode} </Typography>
    </Box>
  );
}
