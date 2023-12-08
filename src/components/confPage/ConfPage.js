import { Box, Typography } from "@mui/material";
import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { getUserData } from "../../utils/mutations";
import Confetti from 'react-dom-confetti';

export default function ConfPage({ user }) {
  const { confCode } = useParams();
  const [name, setName] = useState('');
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const getConfData = async () => {
      const confData = await getUserData(user);
      setName(confData?.displayName);
    }
    getConfData();
    setConfetti(true);
  }, [user, confCode]);

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 30,
    elementCount: 200,
    dragFriction: 0.10,
    duration: 5000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', padding: '20px' }}>
    <Confetti active={confetti} config={confettiConfig} />
    <Typography variant="h4" sx={{ mb: 2 }}>Congratulations, {name?.split(' ')[0]}!</Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>We can't wait to see you in February!</Typography>
    <iframe title="welcome video" style={{ width: '50vw', height: '60vh' }} src="https://www.youtube.com/embed/omH9elhUtKI?autoplay=1&mute=0">
    </iframe>
  </Box>
  );
}
