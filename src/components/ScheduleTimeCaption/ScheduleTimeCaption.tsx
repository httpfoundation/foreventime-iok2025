import { styled } from '@mui/system';

/* const TimeDiv = styled('div')`
	transition: all 0.2s ease-out;
	font-size: 0.75rem;
	font-weight: 700;
	color: rgba(0, 0, 0, 0.5);
	svg {
		transition: all 0.2s ease-out;
		fill: rgba(0, 0, 0, 0.5);
		height: 15px;
		transform: translateY(2.5px);
		margin-right: 8px;
	}
` */

const TimeDiv = styled('div')(
  ({ theme }) => `
	transition: all 0.2s ease-out;
	font-size: 0.75rem;
	font-weight: 700;
	color: ${theme.palette.grey[300]};
	svg {
		transition: all 0.2s ease-out;
		fill:  ${theme.palette.grey[300]};
		height: 15px;
		transform: translateY(2.5px);
		margin-right: 8px;
	}
`,
);

const ScheduleTimeCaption = (props: { date?: Date }) => {
  const { date } = props;
  return (
    <TimeDiv>
      <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 18.25C4.66738 18.25 0.75 14.3326 0.75 9.5C0.75 4.66738 4.66738 0.75 9.5 0.75C14.3326 0.75 18.25 4.66738 18.25 9.5C18.25 14.3326 14.3326 18.25 9.5 18.25ZM9.5 16.5C11.3565 16.5 13.137 15.7625 14.4497 14.4497C15.7625 13.137 16.5 11.3565 16.5 9.5C16.5 7.64348 15.7625 5.86301 14.4497 4.55025C13.137 3.2375 11.3565 2.5 9.5 2.5C7.64348 2.5 5.86301 3.2375 4.55025 4.55025C3.2375 5.86301 2.5 7.64348 2.5 9.5C2.5 11.3565 3.2375 13.137 4.55025 14.4497C5.86301 15.7625 7.64348 16.5 9.5 16.5V16.5ZM10.375 9.5H13.875V11.25H8.625V5.125H10.375V9.5Z" />
      </svg>
      {date && new Date(date).toLocaleString('hu-hu', { minute: 'numeric', hour: 'numeric' })}
    </TimeDiv>
  );
};

export default ScheduleTimeCaption;
