import React from 'react';
import { Box, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Conference } from "../../../utils/types";

interface AdminConferenceCardProps {
  conf: Conference;
}

const AdminConferenceCard: React.FC<AdminConferenceCardProps> = ({ conf }) => {
  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={{ margin: '10px', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '15px',
        }}
      >
        <Typography
          component="div"
          variant="h6"
          onClick={() => { navigate(`/ADMIN/${conf?.conferenceCode}`) }}
          sx={{
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          {conf?.conferenceCode}
        </Typography>
        <Divider sx={{ marginY: '10px' }} />
        <Typography variant="subtitle1">{conf?.conferenceName}</Typography>
        <Typography variant="subtitle1">{conf?.registrants ?? 0} Registrants</Typography>
        <Typography variant="subtitle1">Prices:</Typography>
        {Object.entries(conf?.prices || {}).map(([category, price]) => (
          <Typography key={category} variant="subtitle2" sx={{ marginLeft: '20px' }}>
            {`${category}: $${price}`}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default AdminConferenceCard;
