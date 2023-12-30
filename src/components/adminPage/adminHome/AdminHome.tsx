import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import MenuBar from '../adminMenuBar/AdminMenuBar';
import AdminConferenceCardProps from './AdminConferenceCard';
import { subscribeToConferences } from '../../../utils/mutations/conferences';
import MuiAlert from '@mui/material/Alert';
import { Conference } from '../../../utils/types';

// ADMIN HOMEPAGE

const AdminHome: React.FC = () => {
  const [confs, setConfs] = useState<Conference[]>([]);

  useEffect(() => {
    // Set up the listener for real-time updates
    const unsubscribe = subscribeToConferences((data: Conference[]) => {
      setConfs(data);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  
  
  return (
    <Box>
      <MenuBar />
      <Box sx={{ marginTop: '64px', p: '1px' }}>
        <MuiAlert elevation={6} variant="filled" severity="warning" sx={{ marginY: '10px' }}>
          Attention! You are irreversibly editing the database directly with administrator privileges.
          Any changes can be highly destructive!
        </MuiAlert>

        <Grid container item spacing={3} justifyContent="center">
        {confs?.map((conf: Conference) => (
          <Grid item key={conf.conferenceCode} xs={12} sm={6} md={4} lg={3}>
            <AdminConferenceCardProps conf={conf} />
          </Grid>
        ))}
      </Grid>

      </Box>
    </Box>
  );
};

export default AdminHome;
