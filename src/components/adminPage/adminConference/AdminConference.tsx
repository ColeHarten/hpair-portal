import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { subscribeToConference, subscribeToUsersInConf } from '../../../utils/mutations';
import { Box, Divider, TextField, Typography } from '@mui/material';
import MenuBar from '../adminMenuBar/AdminMenuBar';
import AdminConferenceAttendeeTable from './AdminConferenceAttendeeTable';
import PaymentModal from './AdminConferencePaymentModal';
import { Conference, User } from '../../../utils/types';

export default function AdminConference() {
  const { confCode } = useParams<{ confCode: string }>();

  const [confData, setConfData] = useState<Conference | null>(null);
  const [attendees, setAttendees] = useState<User[]>([]); 
  const [orderID, setOrderID] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Check if confCode is defined, use a default value if not
    const code = confCode || 'defaultConferenceCode';

    // Set up onSnapshot listeners
    const unsubscribeConference = subscribeToConference(code, (data: Conference | null): void => {
      if (data) {
        setConfData(data);
      } else {
        // Handle case where conference data is not found
        console.log(`Conference with code ${code} not found`);
      }
    });

    const unsubscribeUsersInConf = subscribeToUsersInConf(code, (data: User[] | null): void => {
      if (data) {
        setAttendees(data);
      } else {
        // Handle case where user data is not found
        console.log(`Users in conference with code ${code} not found`);
      }
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
            {confData?.registrants} registrants
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
        <AdminConferenceAttendeeTable attendees={attendees} setOrderID={setOrderID} searchQuery={searchQuery} />
      </Box>
    </>
  );
}
