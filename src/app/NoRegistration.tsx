import {
  Button,
  Divider,
  TextField,
  Tooltip,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Box,
  Grow,
  Zoom,
} from '@mui/material';
import React, { useState } from 'react';
import { Login as LoginIcon } from '@mui/icons-material';
import imageOnTop from '../assets/img/itmp-1.png';
import { useRegistration } from '../Store';

export const NoRegistration = () => {
  const [registration, loading, error] = useRegistration();
  const [id, setId] = useState('');

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = window.location.origin + window.location.pathname + '?q=' + id;
  };

  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto',
        backgroundColor: 'primary.main',
        p: { xs: 2, md: 6 },
      }}
    >
      <Paper
        elevation={10}
        sx={{
          margin: 'auto',
          bgcolor: 'primary.main',
          p: 4,
          color: 'text.primary',
          borderRadius: '8px',
          textAlign: 'center',
          width: '600px',
          maxWidth: '100%',
          fontWeight: '600',
        }}
      >
        {error && (
          <Zoom in>
            <Alert severity="error" sx={{ mb: 4, textAlign: 'left', pr: 3 }}>
              <AlertTitle sx={{ pt: '3px', fontWeight: 700, textAlign: 'left' }}>
                Érvénytelen kód
              </AlertTitle>
              A link, amire kattintottál, vagy az általad megadott kód érvénytelen.
              <br />
              Amennyiben már regisztráltál, kattints az e-mailben kapott linkre, vagy add meg az
              oldal alján az egyedi kódodat.
              <br />
              Ha még nem regisztráltál, akkor kattints az alábbi "Regisztráció" gombra.
            </Alert>
          </Zoom>
        )}
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
          Az IOK 2024 konferencián való részvétel regisztrációhoz kötött!!
        </Typography>
        <img src={imageOnTop} alt="" style={{ width: '200px', maxWidth: '70%' }} />
        <Typography variant="body1" component="p" sx={{ my: 1 }}>
          Regisztrálj, és emailben megkapod a bejelentkezéshez használható személyes linkedet és a
          személyes kódodat!
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          size="large"
          href="https://iok2024.http-alapitvany.hu/"
        >
          Regisztráció
        </Button>

        <Divider color="#fff" sx={{ my: 4 }} />
        <Typography variant="body1" component="p" sx={{ fontSize: '0.9rem', mb: 1, mt: 2 }}>
          Amennyiben már regisztráltál, kattints az e-mailben kapott linkre, vagy add meg az egyedi
          kódodat:
        </Typography>
        <form onSubmit={login}>
          <TextField
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Egyedi kód"
            sx={{
              width: '300px',
              input: { textAlign: 'center' },
              fieldset: { borderColor: '#fff !important' },
            }}
          />
          <Tooltip title="Belépés" arrow placement="right">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ ml: 1, mt: '6px', height: '49px' }}
            >
              <LoginIcon sx={{ transform: 'translateX(-2px)' }} />
            </Button>
          </Tooltip>
        </form>
      </Paper>
    </Box>
  );
};
