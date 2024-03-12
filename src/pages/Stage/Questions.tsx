import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useRegistration, useStore } from '../../Store';
import { Box } from '@mui/system';
import { DatoTalk } from '../../types';
import { useDatoClient } from '../../useQuery';

export const Questions = (props: { schedule?: DatoTalk[]; stageId?: number }) => {
  const store = useStore();

  const [anonymus, setAnonymus] = useState(false);
  const [targetTalk, setTargetTalk] = useState<number>(0);
  const [targetSpeaker, setTargetSpeaker] = useState<number>(-1);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const talk = useMemo(
    () => store.talks.find((t) => String(t.id) === String(targetTalk)),
    [targetTalk, store.talks],
  );
  const speakerIds = useMemo(() => talk?.speaker?.map((s) => s.id), [talk?.speaker]);
  const speakers = useMemo(
    () => store.presenters.filter((p) => speakerIds?.includes(p.id)),
    [store.presenters, speakerIds],
  );

  const client = useDatoClient();

  const [registration] = useRegistration();
  const { palette } = useTheme();

  const sendQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      stage: String(props.stageId),
      talk: String(targetTalk),
      speaker: targetSpeaker !== -1 ? String(targetSpeaker) : null,
      content,
      registration: anonymus ? null : String(registration?.id) ?? null,
    };
    setLoading(true);
    try {
      await client?.items.create({
        itemType: '94465', //'1917974',
        ...data,
      });
      setContent('');
      setTargetSpeaker(-1);
      setTargetTalk(0);
      setSuccess(true);
    } catch (e) {
      console.log(e);
      alert('Hiba történt a kérdés elküldése közben. Kérlek próbáld újra később.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (talk && speakers.length === 1) setTargetSpeaker(speakers[0].id);
  }, [talk, speakers]);

  if (!props.stageId) return null;

  return (
    <>
      <Box sx={{ p: 2 }}>
        <form onSubmit={sendQuestion}>
          <TextField
            fullWidth
            label="Név"
            color="secondary"
            sx={{ mb: 0 }}
            value={!anonymus ? registration?.name : '≪ Névtelen ≫'}
            disabled
          />
          <FormControlLabel
            control={
              <Checkbox color="secondary" value={anonymus} onChange={(e, c) => setAnonymus(c)} />
            }
            label="Névtelen kérdés"
            sx={{ my: '5px' }}
          />
          <FormControl fullWidth sx={{ my: 1 }} required>
            <InputLabel color="secondary">Előadás</InputLabel>
            <Select
              value={targetTalk}
              label="Előadás"
              onChange={(e) => setTargetTalk(Number(e.target.value))}
              color="secondary"
              required
            >
              {props.schedule
                ?.filter((talk) => talk.speaker.length)
                .map((talk) => (
                  <MenuItem key={talk.id} value={talk.id}>
                    {talk.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel color="secondary">Címzett előadó</InputLabel>
            <Select
              value={targetSpeaker}
              label="Címzett előadó"
              onChange={(e) => setTargetSpeaker((e.target.value || -1) as number)}
              color="secondary"
            >
              <MenuItem value={-1}>Nincs</MenuItem>
              {speakers.map((speaker) => (
                <MenuItem key={speaker.id} value={speaker.id}>
                  {speaker.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            fullWidth
            multiline
            minRows={6}
            maxRows={10}
            label="Kérdés"
            color="secondary"
            sx={{ mt: 2, p: 0, color: 'white' }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            inputProps={{ style: { color: palette.text.primary, padding: '5px' } }}
          />

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            type="submit"
            disabled={loading || !targetTalk || !content}
          >
            Küldés
          </Button>
        </form>
      </Box>
      <Dialog open={success}>
        <DialogTitle>Kérdés sikeresen elküldve</DialogTitle>
        <DialogContent>
          <DialogContentText>Köszönjük a kérdésedet.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccess(false)} color="secondary" variant="contained">
            Bezárás
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
