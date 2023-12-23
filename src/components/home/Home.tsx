import { Box } from "@mui/material";
import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import SignIn from './SignIn';
import SignUp from './SignUp';
import JoinConf from "./JoinConf";
import Planet from './planet/Planet';

import type { User } from '../../utils/types';

interface HomeProps {
  user: User | null;
}

//!: The page does not change to the join conference page when the user is signed in

export default function Home( {user} : HomeProps) : JSX.Element {
  const [isSignUp, setIsSignUp] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:850px)');

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: "url('art/home-background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        maxHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2%',
          gap: 8,
          '@media (max-width:850px)': {
            justifyContent: 'center',
          },
        }}
      >
        {!isSmallScreen && (
          <Box sx={{
            width: '40%',
          }}>
            <Planet />
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '60%',
          }}
        >
          <img src="art/HPAIR Logo Banner (White).png" alt="HPAIR Logo" width="70%" style={{ minWidth: '291px' }} />
          <Box
            sx={{
              p: 4,
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(220, 20, 60, 0.6)',
              border: '4px solid #fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '80vh',
              minWidth: '375px',
              padding: '2rem 3rem 2rem 3rem',
              width: '60%',
            }}
          >
            {!user ?
              (isSignUp ? (
                <SignUp onSignInClick={handleSignInClick} />
              ) : (
                <SignIn onSignUpClick={handleSignUpClick} />
              )) : (
                <Box sx={{ overflow: "auto" }}>
                  <JoinConf user={user} />
                </Box>
              )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
