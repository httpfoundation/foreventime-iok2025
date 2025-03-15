import { Box, Theme, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';
import httpLogo from '../assets/img/HTTP Logo.png';

const BottomBar = () => {
  const { pathname } = useLocation();
  const underMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const smallHeight = useMediaQuery('screen and (max-height: 650px)');

  const hideBottomBar =
    pathname.startsWith('/stage') ||
    pathname.startsWith('/szekcio') ||
    pathname.startsWith('/iok-cafe') ||
    underMd;

  const showBottomPadding =
    ['/tamogatok', '/eloadasok', '/ertekeles', '/http-csapat', '/etlap', '/utmutato'].includes(
      pathname,
    ) || pathname.startsWith('/eloadok');

  if (hideBottomBar || smallHeight) return null;

  return (
    <>
      <Box sx={{ mt: '47px', display: showBottomPadding ? 'block' : 'none' }}></Box>
      <Box
        sx={{
          height: '47px',
          bgcolor: '#4b4c5c',
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <img
          src={httpLogo}
          alt="HTTP Logo"
          style={{ position: 'absolute', right: 0, bottom: 0, height: '140px', width: 'auto', transform: 'translateY(-47px)' }}
        />
      </Box>
    </>
  );
};

export default BottomBar;
