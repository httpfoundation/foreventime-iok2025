import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageTitleStyled = styled(Typography)<
  TypographyProps | { align: 'center' | 'left' | 'right'; white?: boolean }
>(
  ({ theme, align, color }) => `
	text-align: ${align || 'center'};
	margin: ${theme.spacing(3)} 0;
	color: ${color || theme.palette.text.primary};
`,
);

const PageTitle = (props: {
  children?: React.ReactNode | string;
  align?: 'center' | 'left' | 'right';
  color?: string;
}) => (
  <PageTitleStyled color={props.color} align={props.align} variant="h1">
    {props.children}
  </PageTitleStyled>
);
export default PageTitle;
