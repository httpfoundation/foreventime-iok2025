import { Link, useNavigate } from 'react-router-dom';
import { useStages } from '../../Store';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import { PageContainer, PageTitle } from '../../components';
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';

export const AllTalks = () => {
  const stages = useStages();

  const [openScheduleItem, setOpenScheduleItem] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <PageContainer>
      <PageTitle>Előadások</PageTitle>
      <Container>
        {stages?.map((stage) => (
          <Box key={stage.id} sx={{ color: 'primary.contrastText', pt: 2, pb: 2 }}>
            <Typography
              variant="h2"
              noWrap
              component={Link}
              to={`/szekcio/${stage.slug}`}
              color="secondary"
            >
              {stage.name} szekció
            </Typography>
            {stage.schedule?.map((talk) => (
              <ScheduleItem
                onPlay={(streamId) =>
                  navigate('/szekcio/' + stage.slug, {
                    state: { streamId, openScheduleItem: talk.id },
                  })
                }
                key={talk.id}
                onClick={() => setOpenScheduleItem(openScheduleItem === talk.id ? null : talk.id)}
                open={openScheduleItem === talk.id}
                talkId={talk.id}
              />
            ))}
          </Box>
        ))}
      </Container>
    </PageContainer>
  );
};
