import { Box, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ConferenceWidget({ confData }) {
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
                onClick={() => {navigate(`/ADMIN/${confData?.id}`)}}
                sx={{
                    textAlign: 'center',
                    cursor: 'pointer',
                }}
            >
                {confData?.id}
            </Typography>
            <Divider sx={{ marginY: '10px' }} />
            <Typography variant="subtitle1">{confData?.conferenceName}</Typography>
            <Typography variant="subtitle1">{confData?.attendees.length} Registrants</Typography>
            <Typography variant="subtitle1">Prices:</Typography>
            {Object.entries(confData?.prices || {}).map(([category, price]) => (
              <Typography key={category} variant="subtitle2" sx={{ marginLeft: '20px' }}>
                {`${category}: $${price}`}
              </Typography>
            ))}
          </Box>
        </Paper>
      );
  }