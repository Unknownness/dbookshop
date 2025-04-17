import React from 'react';
import { AppBar, Box, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import BookList from './components/BookList';
import { keyframes } from '@emotion/react';

const gradientAnimation = keyframes`
  0% {
    background: linear-gradient(45deg, #C5E1A5, #66BB6A, #9CCC65);
    background-size: 200% 200%;
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const App = () => {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        elevation={4}
        sx={{
          background: 'linear-gradient(45deg, #C5E1A5, #66BB6A, #9CCC65)',
          backgroundSize: '200% 200%',
          animation: `${gradientAnimation} 10s ease infinite`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', minHeight: 80 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Book Shop
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="xl"
        sx={{
          py: 6,
          minHeight: 'calc(100vh - 80px)',
          background: 'linear-gradient(45deg, #f8f9fa 0%, #e9ecef 100%)',
        }}
      >
        <Box
          sx={{
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 40px rgba(31, 38, 135, 0.25)',
            },
          }}
        >
          <BookList />
        </Box>
      </Container>
    </>
  );
};

export default App;
