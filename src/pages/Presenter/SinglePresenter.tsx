import { useNavigate, useParams } from 'react-router-dom';
import { usePresenterWithTalksByStage } from '../../Store';
//import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import { PageContainer, PageTitle, Paragraph, ScheduleItem } from '../../components';
import { Grid, Typography, TypographyProps } from '@mui/material';
import { PageSubtitle } from '../../components';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const PresenterImage = styled('img')`
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled(Typography)`
  font-weight: 700;
  margin: 1rem 0;
`;

export const SinglePresenter = () => {
  const { presenterSlug } = useParams();

  const presenter = usePresenterWithTalksByStage(presenterSlug ?? null);
  const navigate = useNavigate();
  const [openScheduleItem, setOpenScheduleItem] = useState<number | null>(null);

  return (
    <PageContainer container>
      <PageTitle>Előadó</PageTitle>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <PresenterImage src={presenter?.image?.url} alt={presenter?.name} />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pb: 1 }}
        >
          <TalkTitle variant="h2" align="left" sx={{ color: 'text.primary' }}>
            {presenter?.name}
          </TalkTitle>
          <PageSubtitle>
            {presenter?.title}, {presenter?.company}
          </PageSubtitle>
          {presenter?.bio && <Paragraph>{presenter.bio}</Paragraph>}
        </Grid>
      </Grid>
      {presenter.talksByStage?.map((stage) => (
        <>
          <SectionTitle variant="h5">"{stage?.name}" szekció</SectionTitle>
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
        </>
      ))}
    </PageContainer>
  );
};

const TalkTitle = styled(Typography)<TypographyProps>(
  ({ theme }) => `
	text-align: "left";
	margin: -${theme.spacing(2)} 0 ${theme.spacing(2)} 0;
`,
);

export default SinglePresenter;
