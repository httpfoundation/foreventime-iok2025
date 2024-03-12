import {
  AppBar,
  Grid,
  Tab,
  Tabs,
  Typography,
  Zoom,
  CircularProgress,
  Alert,
  Tooltip,
  Fab,
} from '@mui/material';
import YouTubeVideo from 'react-youtube';
import './Stage.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import { useCallback, useEffect, useState } from 'react';
import { LanguageSelect, PageTitle } from '../../components';
import { useLiveStaticElements, useStage, useStages, useStreams } from '../../Store';
import { Box } from '@mui/system';
import ItmpImg from '../../assets/img/itmp-1.png';
import educationNextImage from '../../assets/img/edunext_stage_image.png';
import { styled, useTheme } from '@mui/material/styles';
import { PageHeaderTitle } from '../../components/PageContainer';
import {
  ArrowBackIosNew as ArrowLeftIcon,
  ArrowForwardIos as ArrowRightIcon,
} from '@mui/icons-material';
import { Questions } from './Questions';
import { StructuredText } from 'react-datocms';

const NoStream = () => {
  const text = useLiveStaticElements().streamNotLive;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'primary.dark',
        color: '#fff',
        py: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Zoom in>
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={ItmpImg}
            alt=""
            style={{ width: '400px', maxWidth: 'min(calc(50vw * 9 / 16), 50vh)' }}
          />
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: { xs: '26px', lg: '40px' },
              fontWeight: 700,
              mt: 2,
              color: '#fff',
            }}
          >
            <StructuredText data={text} />
          </Typography>
        </Box>
      </Zoom>
    </Box>
  );
};

const embedDomain =
  window.localStorage.dev === 'true' ? 'localhost' : window.origin.replace('https://', '');

const VideoContainer = styled('div')(
  ({ theme }) => `
	background-color: #000;
	height: calc(100vw * 9 / 16);
	${theme.breakpoints.up('lg')} {
		height: 100%;
	}
	${theme.breakpoints.down('lg')} {
		max-height: calc(100vw * 9 / 16);
	}
	overflow-y: hidden;
	width: 100%;
`,
);

const StagePage = () => {
  const { stageId: stageSlug } = useParams();

  const stage = useStage(stageSlug);
  const streams = useStreams();

  const location = useLocation();
  const streamIdFromUrl = (location.state as any)?.streamId || null;

  const [selectedStreamId, setSelectedStreamId] = useState<number | null>(streamIdFromUrl);

  const fisrtStageLiveStream = stage?.streams?.find((stream) => stream.live);
  const { streams: stageStreams } = stage || {};

  /*    console.log({selectedStreamId:selectedStreamId})
   console.log("stage.sterams", stage.streams) */

  /* 	useEffect(() => {
			// TODO: Keep language preference
		
			//if (!stage?.streams?.find(stream => stream.id === selectedStreamId)) setSelectedStreamId(stage?.streams?.length ? stage?.streams[0].id : null)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage]) */

  //Switch to a stage
  // NEED TO TEST AND REVIEW NEXT TIME!!!!
  useEffect(() => {
    // Stage has live stream
    if (fisrtStageLiveStream) {
      // Stage has live stream
      setSelectedStreamId(fisrtStageLiveStream.id);
    } else {
      // Stage has not live stream
      if (!streamIdFromUrl) setSelectedStreamId(stageStreams?.length ? stageStreams[0].id : null);
    }
  }, [stageSlug, fisrtStageLiveStream, stageStreams, streamIdFromUrl]);

  const selectedStream = streams?.find((stream) => stream.id === selectedStreamId);
  /* console.log({selectedStream}) */

  const [selectedTab, setSelectedTab] = useState<number>(0);

  const { palette } = useTheme();

  const fabs: any[] = [
    {
      title: `${stage.nextStage?.name || ''}`,
      to: `/szekcio/${stage?.nextStage?.slug}`,
      icon: <ArrowRightIcon sx={{ transform: 'translateX(2px)' }} />,
      disabled: !stage?.nextStage,
    },
    {
      title: `${stage.prevStage?.name || ''}`,
      to: `/szekcio/${stage?.prevStage?.slug}`,
      icon: <ArrowLeftIcon sx={{ transform: 'translateX(-2px)' }} />,
      disabled: !stage?.prevStage,
    },
  ];

  const chatDisabled = !selectedStream || !selectedStream?.youtubeVideoId || !selectedStream.live;

  useEffect(() => {
    if (chatDisabled) setSelectedTab(0);
  }, [selectedStreamId]);

  useEffect(() => setSelectedTab(0), [stageSlug]);

  const [openScheduleItem, setOpenScheduleItem] = useState<number | null>(
    (location.state as any)?.openScheduleItem || null,
  );

  return (
    <>
      <Box
        sx={{
          height: { xs: 'auto', lg: '100%' },
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'primary.main',
        }}
      >
        {fabs.map((fab, index) => (
          <Tooltip title={fab.title} placement="bottom" arrow key={index}>
            <Fab
              disabled={fab.disabled}
              color="primary"
              aria-label="home"
              sx={{
                position: 'absolute',
                right: 170 + index * 70,
                top: 80,
                zIndex: 900,
                display: { lg: 'flex', xs: 'none' },
              }}
              component={Link}
              to={fab.to}
            >
              {fab.icon}
            </Fab>
          </Tooltip>
        ))}
        <Box sx={{ bgcolor: 'primary.main', mb: '-8px' }}>
          <PageTitle>{stage?.pageTitle}</PageTitle>
        </Box>
        <Grid
          container
          spacing={0}
          id="stage"
          sx={{ height: '100%', overflowY: { xs: 'auto', lg: 'hidden' }, maxHeight: '100%' }}
        >
          <Grid item xs={12} lg={9} sx={{ position: 'relative', height: { lg: '100%' } }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                zIndex: -1,
                position: 'absolute',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 100,
                }}
              >
                <CircularProgress size={60} sx={{ zIndex: 100, color: '#fff' }} />
              </Box>
            </Box>

            {(selectedStream?.live || selectedStream?.recording) &&
              selectedStream?.youtubeVideoId && (
                <VideoContainer>
                  <YoutubeVideoComponent
                    key={selectedStream.youtubeVideoId}
                    videoId={selectedStream.youtubeVideoId}
                  />
                </VideoContainer>
              )}

            {((!selectedStream?.live && !selectedStream?.recording) ||
              !selectedStream?.youtubeVideoId) && (
              <VideoContainer>
                {stage.staticVideo ? (
                  <video
                    style={{ backgroundColor: palette.primary.main, width: '100%', height: '100%' }}
                    src={stage.staticVideo.url}
                    autoPlay
                    loop
                    controls
                  />
                ) : (
                  <NoStream />
                )}
              </VideoContainer>
            )}

            {stage?.name &&
              (!selectedStreamId || (!selectedStream?.live && !stage.staticVideo?.url)) && (
                <NoStream />
              )}
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              height: { xs: 'calc(100% - (100vw * 9 / 16))', lg: '100%' },
              minHeight: { xs: '300px', lg: 0 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100%)',
                height: '100%',
              }}
            >
              <AppBar
                component="div"
                position="static"
                color="default"
                sx={{ px: 2, bgcolor: 'info.dark', pt: 2 }}
                elevation={1}
              >
                <div>
                  <LanguageSelect
                    value={selectedStream?.language.id ?? null}
                    onChange={(languageId) =>
                      setSelectedStreamId(
                        stage?.streams?.find((stream) => stream.language.id === languageId)?.id ??
                          null,
                      )
                    }
                    options={
                      stage?.streams?.map((stream) => {
                        return { language: stream.language, live: stream.live };
                      }) ?? []
                    }
                  />
                </div>
                <Tabs
                  textColor="secondary"
                  indicatorColor="secondary"
                  value={selectedTab}
                  onChange={(e, v) => setSelectedTab(v)}
                  centered
                  sx={{
                    '& button': { color: 'text.primary' },
                    mt: stage?.streams?.length ? 1 : 0,
                    color: 'text.secondary',
                  }}
                >
                  <Tab label="Program" />
                  <Tab label="Kérdések" />
                  <Tab label="Chat" disabled={chatDisabled} />
                </Tabs>
              </AppBar>
              <Box sx={{ flex: 1, overflow: 'auto', backgroundColor: 'info.main' }}>
                {selectedTab === 0 && (
                  <Box sx={{ px: 1 }}>
                    {stage?.schedule?.map((talk) => (
                      <ScheduleItem
                        onPlay={(streamId) => setSelectedStreamId(streamId)}
                        onClick={() =>
                          setOpenScheduleItem(openScheduleItem === talk.id ? null : talk.id)
                        }
                        open={openScheduleItem === talk.id}
                        key={talk.id}
                        talkId={talk.id}
                      />
                    ))}
                  </Box>
                )}
                {selectedTab === 1 && <Questions schedule={stage?.schedule} stageId={stage?.id} />}
                {selectedTab === 2 && selectedStream && (
                  <Box
                    sx={{
                      position: 'relative',
                      flex: 1,
                      height: '100%',
                      overflowY: 'hidden',
                      minHeight: '500px',
                      backgroupColor: 'primary.main',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <CircularProgress sx={{ zIndex: 100 }} color="secondary" />
                    </Box>
                    <iframe
                      key={selectedStream?.youtubeVideoId}
                      title="chat"
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        minHeight: '500px',
                      }}
                      allowFullScreen
                      frameBorder="0"
                      src={`https://www.youtube.com/live_chat?v=${selectedStream?.youtubeVideoId}&embed_domain=${embedDomain}&dark_theme=0`}
                    ></iframe>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const YoutubeVideoComponent = (props: { videoId: string }) => {
  return (
    <YouTubeVideo
      /* key={key} */
      videoId={props.videoId}
      containerClassName="embed-video"
      className="embed-video-inner"
      opts={{
        playerVars: {
          autoplay: 1,
          hl: 'hu',
          //modestbranding: 1,
          rel: 0,
          color: 'white',
          controls: 1,
          showinfo: 0,
          loop: 0,
          origin: window.location.origin,
          //playlist: props.videoId
        },
      }}
    />
  );
};

export default StagePage;
