import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { styled } from '@mui/system';

const Link = (props: { children: React.ReactElement; to?: string; lightColor?: boolean }) => {
  return (
    <>
      <StyledLink to={props.to || '#'}>{props.children}</StyledLink>
    </>
  );
};

const StyledLink = styled(ReactRouterLink)(({ theme }) => ({
  color: 'white',
  '&:hover': {
    color: 'aqua',
    textdecoration: 'none',
  },
}));
export default Link;
