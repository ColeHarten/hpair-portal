import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import { useParams } from "react-router-dom";
import type { User } from "../../utils/types";
import MenuBar from "./menuBar/MenuBar";

interface ConfPageProps {
  user: User | null; // Change the type of user to match your actual user type
}

export default function ConfPage({ user }: ConfPageProps) {
  const { confCode } = useParams();
  const [confetti, setConfetti] = useState<boolean>(false);

  useEffect(() => {

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
    <>
    <MenuBar user={user} />
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', overflow: 'hidden', marginTop: '64px' }}>
      <Confetti active={confetti} config={confettiConfig} />
      <Typography variant="h4" sx={{ mb: 2 }}>Congratulations, {user?.displayName?.split(' ')[0]}!</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>We can't wait to see you in February!</Typography>
      <iframe title="welcome video" style={{ width: '50vw', height: '60vh' }} src="https://www.youtube.com/embed/omH9elhUtKI?autoplay=1&mute=0">
      </iframe>
    </Box>
    </>
  );
}
