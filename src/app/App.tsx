import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Box, CircularProgress, CssBaseline } from '@mui/material';

import { BrowserRouter, Navigate } from 'react-router-dom';
import Main from '../components/Main';
import Header from '../components/Header';
import { StoreProvider, useError, useRegistration } from '../Store';
import React from 'react';

import { NoRegistration } from './NoRegistration';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <BrowserRouter>
          <RegistrationLoadSpinner>
            <CssBaseline />
            <Header />
            <Main />
          </RegistrationLoadSpinner>
        </BrowserRouter>
      </StoreProvider>
    </ThemeProvider>
  );
};

const RegistrationLoadSpinner = (props: { children: React.ReactNode }) => {
  const [registration, loading] = useRegistration();
  const error = useError();

  if (loading)
    return (
      <Box
        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <CircularProgress color="secondary" size={60} />
      </Box>
    );

  if (error || registration) {
    return props.children as JSX.Element;
  }

  return (
    <>
      <CssBaseline />
      <NoRegistration />
    </>
  );
};

export default App;
