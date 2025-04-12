import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { KeyboardBackspace as KeyboardBackspaceIcon } from '@mui/icons-material';
import { Box } from '@mui/system';

const BackButton = (props: { onClick?: () => void }) => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ width: '120px', mt: 2 }}
      size="large"
      variant="outlined"
      color="primary"
      onClick={() => {
        navigate(-1);
        if (props.onClick) props.onClick();
      }}
      startIcon={<KeyboardBackspaceIcon />}
    >
      <Box sx={{ transform: 'translateY(2px)', display: 'inline' }}>Vissza</Box>
    </Button>
  );
};
export default BackButton;
