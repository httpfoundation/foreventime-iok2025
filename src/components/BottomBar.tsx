import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import httpLogo from '../assets/img/HTTP Logo.png';

const BottomBar = () => {
  const { pathname } = useLocation();
  const hideBottomBar = pathname.startsWith('/stage') || pathname.startsWith('/szekcio');

  if (hideBottomBar) return null;

  return (
    <Box
      sx={{
        height: '47px',
        bgcolor: 'info.light',
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
        style={{ position: 'absolute', right: 0, bottom: 0, height: '85px' }}
      />
    </Box>
  );
};

export default BottomBar;
