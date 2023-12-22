import { Typography, Paper, Box, Divider } from "@mui/material";

export default function ConferenceWidget({ confData }) {
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
            <Typography variant="h6">{confData?.id}</Typography>
            <Divider sx={{ marginY: '10px' }} />
            <Typography variant="subtitle1">Conference Name: {confData?.conferenceName}</Typography>
            <Typography variant="subtitle1">{confData?.attendees.length} registrants</Typography>
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