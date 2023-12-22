import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import MenuBar from '../menuBar/AdminMenuBar';
import ConferenceWidget from '../ConferenceWidget';
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
      {/* Assuming MenuBar is a component you've defined elsewhere */}
      <MenuBar />
      <Box sx={{ marginTop: '70px' }}>
        <MuiAlert elevation={6} variant="filled" severity="warning" sx={{ marginY: '10px' }} 
        >Attention! You are editing the database directly with administrator priviledges. Any changes can be highly destructive! </MuiAlert>
        <Grid container spacing={3}>
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
