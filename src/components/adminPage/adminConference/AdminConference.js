import { Box, Divider, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { subscribeToConference, subscribeToUsersInConf } from '../../../utils/mutations';
import MenuBar from '../adminMenuBar/AdminMenuBar';
import AttendeeTable from './AdminConferenceAttendeeTable';
import PaymentModal from './AdminConferencePaymentModal';

export default function AdminConference() {
  const { confCode } = useParams();
  const [confData, setConfData] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [orderID, setOrderID] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Set up onSnapshot listeners
    const unsubscribeConference = subscribeToConference(confCode, (data) => {
      setConfData(data);
    });

    const unsubscribeUsersInConf = subscribeToUsersInConf(confCode, (data) => {
      setAttendees(data);
    });

    // Unsubscribe from both listeners when the component unmounts
    return () => {
      unsubscribeConference();
      unsubscribeUsersInConf();
    };
  }, [confCode]);

  return (
    <>
      <PaymentModal orderID={orderID} open={!!orderID} onClose={() => setOrderID(null)} />
      <MenuBar />
      <Box sx={{ marginTop: '64px', padding: '10px' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>
            {confData?.conferenceName} ({confCode})
          </Typography>
        </Box>
        <Divider sx={{ margin: '20px 0' }} />
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle1">
            {confData?.attendees.length} registrants
          </Typography>
          <Typography variant="subtitle1">Prices:</Typography>
          {Object.entries(confData?.prices || {}).map(([category, price]) => (
            <Typography key={category} variant="subtitle2" sx={{ marginLeft: '20px' }}>
              {`${category}: $${price}`}
            </Typography>
          ))}
        </Box>
        <TextField
            label="Search"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AttendeeTable attendees={attendees} setOrderID={setOrderID} searchQuery={searchQuery} />
      </Box>
    </>
  );
}
