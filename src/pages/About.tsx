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
    staffPageTitle,
  } = useLiveStaticElements();

  const staff = useStaff('staff') as DatoSpeaker[];
  const junior = useStaff('junior') as DatoSpeaker[];
  const media = useStaff('media') as DatoSpeaker[];
  const sessionLeaders = useStaff('sessionleaders') as DatoSpeaker[];

  return (
    <PageContainer container>
      <PageTitle>{staffPageTitle}</PageTitle>
      <StructuredText data={staffText} />
      <PresenterGrid sx={{ mb: 5 }} columns={{ lg: 5 }}>
        {staff.map((speaker, index) => (
          <PresenterCard noClick presenter={speaker} key={index} />
        ))}
      </PresenterGrid>

      {media.length > 0 && (
        <>
          <StructuredText data={mediaText} />
          <PresenterGrid sx={{ mb: 5 }} columns={{ lg: 5 }}>
            {media.map((speaker, index) => (
              <PresenterCard noClick presenter={speaker} key={index} />
            ))}
          </PresenterGrid>
        </>
      )}

      {junior.length > 0 && (
        <>
          <StructuredText data={juniorText} />
          <PresenterGrid columns={{ lg: 5 }}>
            {junior.map((speaker, index) => (
              <PresenterCard noClick presenter={speaker} key={index} />
            ))}
          </PresenterGrid>
        </>
      )}

      {sessionLeaders.length > 0 && (
        <>
          <StructuredText data={sessionLeadText} />
          <PresenterGrid columns={{ lg: 5 }}>
            {sessionLeaders.map((speaker, index) => (
              <PresenterCard noClick presenter={speaker} key={index} />
            ))}
          </PresenterGrid>
        </>
      )}
    </PageContainer>
  );
};

export default About;

