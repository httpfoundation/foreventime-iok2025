import { PageContainer } from '../components';
import PageTitle from '../components/PageTitle';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <PageContainer container>
      <PageTitle>Hiba</PageTitle>
      <Stack>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, mollitia. Modi
          excepturi atque laborum. Laboriosam provident, deleniti accusantium quisquam sapiente ex
          rerum nihil quas impedit ab harum, officiis eligendi?
        </Typography>
        <Box>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<HomeIcon />}
              sx={{ pt: 1, pb: 1, mt: 2 }}
            >
              Tovább a HTTP Alapítvány oldalára
            </Button>
          </Link>
        </Box>
      </Stack>
    </PageContainer>
  );
};

export default Error;
