import { LiveTv as LiveTvIcon, AccessTime as TimeIcon } from '@mui/icons-material';
import { Avatar, Button, Chip, Stack, Tooltip } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageContainer, PageTitle, Paragraph } from '../../components';
import PresenterCard, { PresenterGrid } from '../../components/PresenterCard';
import { useTalk } from '../../Store';
import { useTheme } from '@mui/material/styles';
import {
  PlayCircle as PlayCircleIcon,
  DownloadForOffline as DownloadIcon,
} from '@mui/icons-material';

export const SingleTalk = () => {
  const { talkSlug } = useParams();

  const talk = useTalk(talkSlug);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <PageContainer container>
      <PageTitle>{talk?.title}</PageTitle>
      {/* <TalkTitle variant="h2"></TalkTitle> */}
      <Stack direction="row" spacing={2}>
        <Chip
          label={
            talk.start &&
            new Date(talk.start).toLocaleString('hu-hu', { minute: 'numeric', hour: 'numeric' })
          }
          icon={<TimeIcon style={{ color: theme.palette.text.primary }} />}
        />
        <Tooltip title="Közvetítés megtekintése" placement="right" arrow>
          <Chip
            clickable
            component={Link}
            to={`/szekcio/${talk?.stage?.slug}`}
            label={`"${talk?.stage?.name}" szekció`}
            icon={<LiveTvIcon style={{ color: theme.palette.text.primary }} />}
            sx={{ pl: 1 }}
          />
        </Tooltip>
      </Stack>
      {talk.recordings?.map((recording) => (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mr: 1, mt: 2, pl: 1.3 }}
          onClick={() =>
            navigate('/szekcio/' + talk.stage?.slug, {
              state: { streamId: recording.id, openScheduleItem: talk.id },
            })
          }
        >
          <div
            style={{
              zIndex: 101,
              border: '2px solid #14475C',
              width: 26,
              height: 26,
              borderRadius: '100%',
            }}
          >
            <PlayCircleIcon sx={{ zIndex: 101 }} />
          </div>
          <Avatar
            src={recording.language.image?.url}
            sx={{ width: 20, height: 20, transform: 'translateX(-5px)', zIndex: 100 }}
          />
          <span style={{ paddingTop: '2px' }}>
            {recording.language.playRecordingText || 'Felvétel lejátszása'}
          </span>
        </Button>
      ))}
      {talk.presentation && (
        <Button
          href={talk.presentation.url}
          target="_blank"
          variant="outlined"
          color="secondary"
          sx={{ mr: 1, mt: 2, pl: 1.3 }}
        >
          <div
            style={{
              border: '2px solid transparent',
              width: 26,
              height: 26,
              borderRadius: '100%',
              marginRight: '4px',
            }}
          >
            <DownloadIcon />
          </div>
          <span style={{ paddingTop: '2px', fontWeight: 600 }}>Prezentáció letöltése</span>
        </Button>
      )}
      <Paragraph>{talk.description}</Paragraph>
      <PresenterGrid columns={{ lg: Math.max(4, talk.speakers.length) }}>
        {talk.speakers.map((speaker, index) => (
          <PresenterCard presenter={speaker} key={index} />
        ))}
      </PresenterGrid>
    </PageContainer>
  );
};

// const TalkTitle = styled(Typography)<TypographyProps>(
//   ({ theme }) => `
// 	text-align: "left";
// 	margin: -${theme.spacing(2)} 0 ${theme.spacing(2)} 0;
// `,
// );

/* const PageSubtitle = (props: {children?: React.ReactNode}) => <PageSubtitleStyled  variant="h5">{props.children}</PageSubtitleStyled> */

export default SingleTalk;
