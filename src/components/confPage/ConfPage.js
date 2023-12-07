import { Box, Typography } from "@mui/material";
import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { getUserData } from "../../utils/mutations";

export default function ConfPage({ user }) {
  const { confCode } = useParams();
  const [name, setName] = useState('');

  useEffect(() => {
    const getConfData = async () => {
      const confData = await getUserData(user);
      setName(confData?.displayName);
    }
    getConfData();
  }, [user, confCode]);

  return (
  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', padding: '20px' }}>
    <Typography variant="h4" sx={{ mb: 2 }}>Congratulations, {name?.split(' ')[0]}!</Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>We can't wait to see you in February!</Typography>
    <iframe title="welcome video" style={{ width: '50vw', height: '60vh' }} src="https://www.youtube.com/embed/omH9elhUtKI?autoplay=1&mute=0">
    </iframe>
  </Box>
  );
}
