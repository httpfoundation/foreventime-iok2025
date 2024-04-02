import { PageContainer } from '../components';
import PageTitle from '../components/PageTitle';
import { StructuredText } from 'react-datocms';
import { useLiveStaticElements, useRegistration, useStages, useTalk } from '../Store';
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Star as StarFilled, StarOutline as Star } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import { useDatoClient } from '../useQuery';
import imageOnTop from '../assets/img/itmp-1.png';
import edunextImg from '../assets/img/edunext_stage_image.png';

const TalkRate = (props: {
  id: number;
  rating: number | null;
  setRating: (r: number | null) => void;
}) => {
  const talk = useTalk(props.id);
  if (!talk.speakers.length) return null;
  return (
    <Box sx={{ mt: 1, textAlign: 'center', mb: 2, my: 3 }}>
      <Typography variant="h6" fontSize={'1rem'} align="center" fontWeight={600}>
        {talk.title}
      </Typography>
      <Typography>{talk.speakers?.map((speaker) => speaker.name).join(', ')}</Typography>
      <Box sx={{ margin: 'auto', display: 'inline-block' }}>
        {[1, 2, 3, 4, 5].map((r) => (
          <IconButton onClick={() => props.setRating(props.rating === r ? null : r)} key={r}>
            {(props.rating || 0) < r ? <Star /> : <StarFilled sx={{ color: '#FFC107' }} />}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

const OtherQuestion = (props: {
  id: number | string;
  rating: number | null;
  question: string;
  setRating: (r: number | null) => void;
}) => {
  return (
    <Box sx={{ mt: 1, textAlign: 'center', mb: 2, my: 3 }}>
      <Typography variant="h6" fontSize={'1rem'} align="center" fontWeight={600}>
        {props.question}
      </Typography>
      <Box sx={{ margin: 'auto', display: 'inline-block' }}>
        {[1, 2, 3, 4, 5].map((r) => (
          <IconButton onClick={() => props.setRating(props.rating === r ? null : r)} key={r}>
            {(props.rating || 0) < r ? <Star /> : <StarFilled sx={{ color: '#FFC107' }} />}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

const Rating = () => {
  const stages = useStages();

  const [ratings, setRatings] = useState<{ [id: number | string]: number | null }>({});
  const [comment, setComment] = useState<string>('');
  const [recommendedTopic, setRecommendedTopic] = useState<string>('');

  const client = useDatoClient();
  const [registration] = useRegistration();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [ratingsSent, setRatingsSent] = useState<boolean | null>(null);

  useEffect(() => {
    if (registration) {
      client?.items
        .all({
          filter: {
            type: 'rating',
            fields: {
              registration: {
                eq: registration.id,
              },
            },
          },
          orderBy: 'createdAt_DESC',
          page: {
            limit: 1,
          },
        })
        .then((res) => {
          setLoading(false);
          setRatingsSent(res.length > 0);
          if (res.length) {
            setRatings(JSON.parse(res[0].ratings));
            setComment(res[0].comment);
            setRecommendedTopic(res[0].recommendedTopic);
          }
        });
    }
  }, [registration]);

  const sendRating = async (
    submit = true,
    __ratings: Record<number, number | null> | null = null,
  ) => {
    let _ratings = __ratings || ratings;
    const data = {
      registration: String(registration?.id) ?? null,
      ratings: JSON.stringify(
        Object.fromEntries(Object.entries(_ratings).filter(([_, v]) => v !== null)),
      ),
      comment,
      recommendedTopic,
    };

    if (submit) setLoading(true);
    try {
      await client?.items.create({
        itemType: '94468', //1958391
        ...data,
      });
      if (submit) {
        setSuccess(true);
        setRatingsSent(true);
        document.getElementById('main')?.scrollTo(0, 0);
      }
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const shownStages = useMemo(
    () =>
      registration?.stage
        ? stages.filter((s) => Number(s.id) === registration.stage || s.name.includes('Plenáris'))
        : stages,
    [stages, registration],
  );

  const otherQuestions: Array<{
    id: string;
    question: string;
    type: 'all' | 'onsite' | 'offsite';
  }> = [
    {
      id: 'elegedett-szervezes',
      question: 'Mennyire vagy elégedett a szervezéssel, tájékoztatással?',
      type: 'all',
    },
    { id: 'elegedett-helyszin', question: 'Mennyire vagy elégedett a helyszínnel?', type: 'all' },
    {
      id: 'elegedett-streaming-platform',
      question: 'Mennyire vagy elégedett a streaming platformmal?',
      type: 'all',
    },
    {
      id: 'jovore',
      question: 'Mennyire szívesen vennél részt jövőre is a konferencián?',
      type: 'all',
    },
    {
      id: 'ajanlas',
      question: 'Mennyire ajánlanád ismerőseidnek, kollégáidnak a konferenciát?',
      type: 'all',
    },
  ];
  const { rating: ratingText, closedRating } = useLiveStaticElements();
  /* 	{id: "elegedett-menu", question: "Mennyire vagy elégedett a menüvel?", type: "onsite"},
	{id: "elegedett-app", question: "Mennyire vagy elégedett az IOK VKK platform által nyújtott szolgáltatásokkal?", type: "all"},
 */

  if (!registration?.id) {
    return (
      <PageContainer container>
        <PageTitle>Értékelés</PageTitle>
        <Box sx={{ textAlign: 'center', pb: 4 }}>
          <Typography variant="h6">
            <StructuredText data={closedRating} />
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer container>
      <Dialog open={error}>
        <DialogTitle>Hiba történt!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hiba történt az értékelés elküldése közben. Kérlek próbáld újra később.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(false)} color="secondary" variant="contained">
            Bezárás
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop open={loading || !stages.length}>
        <CircularProgress size={60} />
      </Backdrop>

      <PageTitle>Értékelés</PageTitle>
      <Box sx={{ textAlign: 'center', pb: 4 }}>
        <StructuredText data={ratingText} />
      </Box>
      {ratingsSent && (
        <Box sx={{ width: '600px', maxWidth: '100%', mx: 'auto', mb: 2 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" fontWeight={700} align="center" sx={{ mt: 0.5 }}>
              Köszönjük, hogy értékelted a konferenciát!
            </Typography>
            <img src={imageOnTop} style={{ width: '300px', margin: '30px 0' }} />
          </Paper>
        </Box>
      )}
      {!stages.length ? null : (
        <Box sx={{ width: '600px', maxWidth: '100%', mx: 'auto' }}>
          {shownStages.map((stage, index) => {
            return (
              <Paper sx={{ px: 2, mb: 2, pb: 1, pt: 2, color: 'text.secondary' }} key={index}>
                <Typography variant="h6" fontWeight={700} align="center" sx={{ mt: 0.5 }}>
                  {stage.pageTitle}
                </Typography>
                <Divider sx={{ mt: 2, mb: 4 }} />
                {stage.schedule?.map((talk, index) => (
                  <TalkRate
                    rating={ratings[talk.id]}
                    setRating={(r) => {
                      const _ratings = { ...ratings, [talk.id]: r };
                      //iokLocalStorage("set", "ratings", JSON.stringify(_ratings))
                      setRatings(_ratings);
                      sendRating(false, _ratings);
                    }}
                    key={index}
                    id={talk.id}
                  />
                ))}
              </Paper>
            );
          })}

          <Paper sx={{ px: 2, mb: 2, pb: 2, pt: '1px', color: 'text.secondary' }}>
            {otherQuestions.map((question, index) =>
              question.type === 'all' ||
              (question.type === 'onsite' && registration?.onsite) ||
              (question.type === 'offsite' && !registration?.onsite) ? (
                <OtherQuestion
                  question={question.question}
                  rating={ratings[question.id]}
                  setRating={(r) => {
                    const _ratings = { ...ratings, [question.id]: r };
                    //iokLocalStorage("set", "ratings", JSON.stringify(_ratings))
                    setRatings(_ratings);
                    sendRating(false, _ratings);
                  }}
                  key={index}
                  id={question.id}
                />
              ) : null,
            )}
            <Typography variant="h6" fontSize={'0.8rem'} align="left" fontWeight={600}>
              Milyen témáról hallanál szívesen a következő konferencián?
            </Typography>
            <TextField
              value={recommendedTopic}
              onChange={(e) => setRecommendedTopic(e.target.value)}
              multiline
              fullWidth
              minRows={8}
              color="secondary"
              placeholder="Ide írhatod témajavaslataidat"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'text.secondary',
                  borderColor: 'lightgrey',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                },
              }}
            />
            <Typography
              variant="h6"
              fontSize={'0.8rem'}
              align="left"
              fontWeight={600}
              sx={{ mt: 2 }}
            >
              Megjegyzés, észrevétel, javaslat a konferenciával kapcsolatban:
            </Typography>
            <TextField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              fullWidth
              minRows={8}
              color="secondary"
              placeholder="Ide írhatod egyéb javaslataidat, észrevételeidet és megjegyzéseidet"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'text.secondary',
                  borderColor: 'lightgrey',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                },
              }}
            />
          </Paper>

          <Button
            size="large"
            variant="contained"
            fullWidth
            color="secondary"
            onClick={() => sendRating()}
          >
            Küldés
          </Button>
        </Box>
      )}
    </PageContainer>
  );
};

export default Rating;
