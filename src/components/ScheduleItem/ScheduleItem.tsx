import { DatoSpeaker } from '../../types';
//import "./ScheduleItem.scss"
import { styled } from '@mui/system';
import { ScheduleTimeCaption } from '..';
import { useTalk } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, IconButton, Tooltip } from '@mui/material';
import {
  PlayCircle as PlayCircleIcon,
  DownloadForOffline as DownloadIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

/* Egy napirendi pont komponense */

const TalkTitle = styled('div')(
  ({ theme }) => `
		color: ${theme.palette.grey[300]};
		transition: all 0.2s ease-out;
		font-size: 1.1rem;
		font-weight: 700;
		padding: 0px 0 1px 0;`,
);

const SpeakerCaption = styled('div')(
  ({ theme }) => `
		transition: all 0.2s ease-out;
		font-size: 0.75rem;
		font-weight: 500;
		color: ${theme.palette.grey[300]};`,
);

const Description = styled('div')(
  ({ theme }) => `
		transition: all 0.2s ease-out;
		overflow: hidden;
		font-size: 0.9rem;
		max-height: 0;`,
);

const Speaker = (props: { speaker: DatoSpeaker }) => {
  const { speaker } = props;
  return <SpeakerCaption>{`${speaker.name}, ${speaker.title}, ${speaker.company}`}</SpeakerCaption>;
};

const Speakers = (props: { speakers: DatoSpeaker[] | undefined }) => {
  const { speakers } = props;
  return <>{speakers?.map((speaker) => <Speaker key={speaker.id} speaker={speaker} />)}</>;
};

interface SpeakerImageProps {
  counter: number;
  speaker: DatoSpeaker;
}
const SpeakerImage = styled('div')<SpeakerImageProps>(
  ({ counter, speaker, theme }) => `
		width: 100%;
		transition: all 0.2s ease-out;
		background-size: cover;
		background-position: center;
		border-radius: 100%;
		aspect-ratio: 1;
		align-self: center;
		background-image: url(${speaker.image?.url});
		transform: translateY(${counter * -7}px);
		border-style: solid;
		border-width: 0px;
		border-color: ${theme.palette.primary.light}33;
`,
);

const SpeakersImages = (props: { speakers: DatoSpeaker[] | undefined }) => {
  const { speakers } = props;
  const SpeakersImagesDiv = styled('div')(
    ({ theme }) => `
		width: 70px;
		display: inline-block;
		align-self: center;
		vertical-align: middle;
		transition: all 0.2s ease-out;
		${theme.breakpoints.only('xs')} { 
			display: none;
		},
	}
	`,
  );
  return (
    <SpeakersImagesDiv>
      {speakers?.map((speaker, index) => (
        <SpeakerImage key={speaker.id} speaker={speaker} counter={index} />
      ))}
    </SpeakersImagesDiv>
  );
};

const Abstract = (props: { abstract?: String }) => {
  const { abstract } = props;
  return <Description>{abstract}</Description>;
};

const ScheduleItemContent = styled('div')(
  ({ theme }) => `
	transition: all 0.2s ease-out;
	display: inline-block;
	padding-left: 20px;
	width: calc(100% - 70px);
	${theme.breakpoints.only('xs')} { 
		width: 100%;
	}
	vertical-align: top;
`,
);

const ScheduleItemContainer = styled('div', { shouldForwardProp: (prop) => prop !== 'noClick' })<{
  noClick?: boolean;
  open?: boolean;
}>(
  ({ noClick, open }) => `
	margin: 15px 0;
	transition: all 0.2s ease-out;
	padding: 10px;
	border-radius: 0px;
	${
    !noClick
      ? `
		cursor: pointer;
		&:hover {
			background-color: rgba(0, 0, 0, 0.3);
			/* box-shadow: 0 0rem 1rem rgba(0,0,0,0.2);
			transform: scale(1.03); */
		}
	`
      : `
		cursor: default;
	`
  }
	${open ? `background-color: rgba(0, 0, 0, 0.07);` : ''}
	/* box-shadow: 0 0rem 1rem rgba(0,0,0,0.12); */
`,
);

const ScheduleItemControls = styled('div')<{ open?: boolean }>(
  ({ theme, open }) => `
	transition: all 0.1s ease-out;
	height: 0;
	overflow: hidden;
	${
    open
      ? `
		height: 50px;
	`
      : ''
  }
`,
);

const ScheduleItem = (props: {
  open: boolean;
  talkId: number;
  onClick?: () => void;
  onPlay?: (streamId: number) => void;
}) => {
  const talk = useTalk(props.talkId);
  const noClick = talk?.speakers.length === 0;
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/eloadasok/${talk.id}`);
  };

  const isOnlyTalkInfoAvailable =
    (!talk.recordings || talk.recordings.length === 0) && !talk.presentation;
  const navigateToTalk = () => {
    navigate(`/eloadasok/${talk.id}`);
  };

  const handleContainerClick = props.onClick && !noClick ? props.onClick : () => {};

  return (
    <ScheduleItemContainer
      open={props.open}
      noClick={noClick}
      onClick={isOnlyTalkInfoAvailable ? navigateToTalk : handleContainerClick}
    >
      <SpeakersImages speakers={talk?.speakers} />
      <ScheduleItemContent>
        <ScheduleTimeCaption date={talk?.start} />
        <TalkTitle>{talk?.title}</TalkTitle>
        <Speakers speakers={talk?.speakers} />
        <Abstract abstract={talk?.description} />
      </ScheduleItemContent>
      <ScheduleItemControls open={props.open}>
        {talk.recordings?.map((recording) => (
          <Tooltip title={recording.language.playRecordingText || 'Felvétel lejátszása'} arrow>
            <IconButton
              size="small"
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                props.onPlay && props.onPlay(recording.id);
              }}
            >
              <Badge
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                overlap="circular"
                badgeContent={
                  <Avatar
                    src={recording.language.image?.url}
                    sx={{ width: 20, height: 20 }}
                  ></Avatar>
                }
              >
                <PlayCircleIcon sx={{ fontSize: 40 }} />
              </Badge>
            </IconButton>
          </Tooltip>
        ))}

        {talk.presentation && (
          <Tooltip title="Prezentáció letöltése" arrow>
            <IconButton
              target="_blank"
              href={talk.presentation?.url || ''}
              size="small"
              color="secondary"
              disabled={!talk.presentation}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <DownloadIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="További információ" arrow>
          <IconButton size="small" color="secondary" onClick={handleClick}>
            <InfoIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
      </ScheduleItemControls>
    </ScheduleItemContainer>
  );
};

export default ScheduleItem;
