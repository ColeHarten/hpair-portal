import { Box, Grid } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import { subscribeToConferences } from '../../../utils/mutations/conferences';
import { Conference } from '../../../utils/types';
import MenuBar from '../adminMenuBar/AdminMenuBar';
import AdminConferenceCardProps from './AdminConferenceCard';

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
        <Box sx={{ paddingX: '50px'}}>
          <Grid container spacing={3} justifyContent="center">
            {confs?.map((conf: Conference) => (
              <Grid item key={conf.conferenceCode} xs={8} sm={6} md={4} lg={4}>
                <AdminConferenceCardProps conf={conf} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHome;
