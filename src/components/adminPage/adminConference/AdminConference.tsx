import { Box,Typography, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { subscribeToConference } from '../../../utils/mutations/conferences';
import { subscribeToUsersInConf } from '../../../utils/mutations/users';
import { Conference, User } from '../../../utils/types';
import MenuBar from '../adminMenuBar/AdminMenuBar';
import AdminConferenceregistrantTable from './AdminConferenceRegistrantTable';

export default function AdminConference() {
  const { confCode } = useParams<{ confCode: string }>();

  const [confData, setConfData] = useState<Conference | null>(null);
  const [registrants, setregistrants] = useState<User[]>([]); 

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
    
    console.log(confData)

    const unsubscribeUsersInConf = subscribeToUsersInConf(code, (data: User[] | null): void => {
      if (data) {
        setregistrants(data);
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
  
        <AdminConferenceregistrantTable registrants={registrants} />
      </Box>
    </>
  );
}
