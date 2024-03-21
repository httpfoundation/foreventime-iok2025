import { PageContainer } from '../components';
import PageTitle from '../components/PageTitle';
import { Box, Button, Stack, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const Error = () => {
  const [infoText, setInfoText] = useState('');

  const pollIokInfo = async () => {
    const res = await fetch(
      'https://wy8qg2hpoh.execute-api.eu-west-1.amazonaws.com/default/iokRegistrationData?info=true',
    );
    const text = await res.text();
    setInfoText(text);
  };

  useEffect(() => {
    pollIokInfo();

    const interval = setInterval(pollIokInfo, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageContainer container>
      <PageTitle>Technikai hiba lépett fel 😔</PageTitle>
      <Stack>
        <Typography>
          Sajnos valami gond van, ezért nem jönnek az adatok a virtuális konferenciaközpontunk
          adatbázisából. Mindent megteszünk, hogy minél hamarabb helyreálljon a rendszer. Ha ez nem
          történne meg egy-két percen belül, akkor kérlek, látogass el a HTTP Alíptvány honlapján
          található IOK 2024 információs oldalra, ahol részlesebb információval fogunk szolgálni.
          {!!infoText && (
            <>
              <br />
              <br />
              {infoText}
            </>
          )}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowForward />}
            sx={{ pt: 1, pb: 1, mt: 2 }}
            href="https://http-alapitvany.hu/iok-info"
          >
            Tovább az IOK 2024 infó oldalra a HTTP Alapítvány honlapján
          </Button>
        </Box>
      </Stack>
    </PageContainer>
  );
};

export default Error;
