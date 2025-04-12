import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const Paragraph = styled(Typography)<TypographyProps>(
  () => `
	font-weight: 400;
	/* font-family: "Roboto", "Helvetica", "Arial", sans-serif; */
	text-align: justify;
	margin: 1.2rem 0 1.8rem 0;
	line-height: 1.5;
	font-size: 1rem;
`,
);

export default Paragraph;
