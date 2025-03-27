import { StructuredText } from 'react-datocms';
import { PageContainer } from '../components';
import PageTitle from '../components/PageTitle';
import PresenterCard, { PresenterGrid } from '../components/PresenterCard';
import { useLiveStaticElements, useStaff } from '../Store';
import { DatoSpeaker } from '../types';

const About = () => {
  const {
    staff: staffText,
    junior: juniorText,
    media: mediaText,
    sessionLead: sessionLeadText,
  } = useLiveStaticElements();

  const staff = useStaff('staff') as DatoSpeaker[];
  const junior = useStaff('junior') as DatoSpeaker[];
  const media = useStaff('media') as DatoSpeaker[];
  const sessionLeaders = useStaff('sessionleaders') as DatoSpeaker[];

  return (
    <PageContainer container>
      <PageTitle>A házigazda HTTP-Pannon-csapat</PageTitle>
      <StructuredText data={staffText} />
      <PresenterGrid sx={{ mb: 5 }} columns={{ lg: Math.max(4, staff.length) }}>
        {staff.map((speaker, index) => (
          <PresenterCard noClick presenter={speaker} key={index} />
        ))}
      </PresenterGrid>
      <StructuredText data={mediaText} />
      <PresenterGrid sx={{ mb: 5 }} columns={{ lg: Math.max(4, staff.length) }}>
        {media.map((speaker, index) => (
          <PresenterCard noClick presenter={speaker} key={index} />
        ))}
      </PresenterGrid>
      <StructuredText data={juniorText} />
      <PresenterGrid columns={{ lg: Math.max(4, staff.length) }}>
        {junior.map((speaker, index) => (
          <PresenterCard noClick presenter={speaker} key={index} />
        ))}
      </PresenterGrid>
      <StructuredText data={sessionLeadText} />
      <PresenterGrid columns={{ lg: Math.max(4, staff.length) }}>
        {sessionLeaders.map((speaker, index) => (
          <PresenterCard noClick presenter={speaker} key={index} />
        ))}
      </PresenterGrid>
    </PageContainer>
  );
};

export default About;

