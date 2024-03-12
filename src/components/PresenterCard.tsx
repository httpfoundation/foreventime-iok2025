import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { DatoSpeaker } from '../types';

const PresenterWrapper = styled('div', { shouldForwardProp: (prop) => prop !== 'noClick' })<{
  noClick?: boolean;
}>(
  ({ theme, noClick }) => `
	display: flex;
	flex-direction: column;
	height: 100%;
	box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
	border-radius: 12px;
	overflow: hidden;
	transition: all .2s ease-in-out;
	background-color: #fff;
	&:hover {
		transform: scale(1.08);
	}
	${
    !noClick &&
    `
		cursor: pointer;
	`
  };
	color: ${theme.palette.text.secondary};
`,
);

const PresenterCardImage = styled('img')(
  ({ theme }) => `
	width: 100%;
	height: auto;
	aspect-ratio: 1;
`,
);

const PresenterDetails = styled('div')(
  ({ theme }) => `
	flex: 1;
	//min-height: 80px;
	padding: 5px;
`,
);

const PresenterName = styled('div')(
  ({ theme }) => `
	font-weight: 700;
    font-size: 0.9rem;
    margin: 10px 0 7px 0;
	text-align: center;
`,
);

const PresenterTitle = styled('div')(
  ({ theme }) => `
	font-size: 0.7rem;
	text-align: center;
	margin-bottom: 5px;
`,
);

const PresenterCard = (props: { presenter: DatoSpeaker; noClick?: boolean }) => {
  const { presenter, noClick } = props;
  const LinkOrSpan = noClick
    ? (props: { to?: string; children: React.ReactNode }) => <span>{props.children}</span>
    : Link;
  return (
    <LinkOrSpan to={`/eloadok/${presenter.slug}`}>
      <PresenterWrapper noClick={noClick}>
        <PresenterCardImage src={props.presenter.image?.url} alt={presenter.name} />
        <PresenterDetails>
          <PresenterName>{presenter.name}</PresenterName>
          {(presenter.title || presenter.company) && (
            <PresenterTitle>
              {presenter.title}
              {presenter.title && presenter.company ? ', ' : ''}
              {presenter.company}
            </PresenterTitle>
          )}
        </PresenterDetails>
      </PresenterWrapper>
    </LinkOrSpan>
  );
};

export const PresenterGrid = styled('div')<{ columns?: { xs?: number; sm?: number; lg?: number } }>(
  ({ theme, columns }) => `
	display: grid;
	grid-template-columns: repeat(${columns?.xs || 2}, minmax(0, 1fr));
    gap: 30px;
	max-width: 100%;
	${theme.breakpoints.up('sm')} {
		grid-template-columns: repeat(${columns?.sm || 4}, minmax(0, 1fr));
	}
	${theme.breakpoints.up('lg')} {
		grid-template-columns: repeat(${columns?.lg || 6}, minmax(0, 1fr));
	}
`,
);
export default PresenterCard;
