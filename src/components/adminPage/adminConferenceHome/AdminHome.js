import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import MenuBar from '../adminMenuBar/AdminMenuBar';
import ConferenceWidget from './ConferenceWidget';
import { getAllConferenceData } from '../../../utils/mutations';
import MuiAlert from '@mui/material/Alert';

// ADMIN HOMEPAGE

export default function AdminHome() {
  const [confs, setConfs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = getAllConferenceData().then((data) => {
        setConfs(data);
      });

      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    };

    fetchData();
  }, []);

  return (
    <Box>
      <MenuBar />
      <Box sx={{ marginTop: '64px', p:'1px' }}>
        <MuiAlert elevation={6} variant="filled" severity="warning" sx={{ marginY: '10px' }} 
        >Attention! You are irreversibly editing the database directly with administrator privileges. Any changes can be highly destructive! </MuiAlert>
        
          <Grid container item spacing={3} justifyContent="center">
            {confs?.map((conf) => (
              <Grid item key={conf.id} xs={12} sm={6} md={4} lg={3}>
                <ConferenceWidget confData={conf} />
              </Grid>
            ))}
          </Grid>
      </Box>
    </Box>
  );
}
