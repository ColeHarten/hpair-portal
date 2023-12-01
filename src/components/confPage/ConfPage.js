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
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Typography variant="h4"> Congratulations, {name.split(' ')[0]}! </Typography>
    </Box>

  );
}
