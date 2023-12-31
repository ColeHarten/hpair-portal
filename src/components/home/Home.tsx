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
  setUser: (user: User) => void;
}

export default function Home( {user, setUser} : HomeProps) : JSX.Element {
  const [isSignUp, setIsSignUp] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:850px)');

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
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(220, 20, 60, 0.6)',
              border: '4px solid #fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '80vh',
              minWidth: '400px',
              padding: '2rem 3rem 2rem 3rem',
              width: '60%',
            }}
          >
            {!user ?
              (isSignUp ? (
                <SignUp setIsSignUp={setIsSignUp} setUser={setUser} />
              ) : (
                <SignIn setIsSignUp={setIsSignUp} />
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
