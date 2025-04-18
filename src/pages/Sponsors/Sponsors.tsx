import { Container, Typography } from '@mui/material';
import { PageContainer } from '../../components';
import PageTitle from '../../components/PageTitle';
import { useSponsorCategories } from '../../Store';

const Sponsors = () => {
  const sponsorCategories = useSponsorCategories();

  return (
    <PageContainer>
      <Container>
        <PageTitle>Támogatók és szervezők</PageTitle>

        {sponsorCategories &&
          sponsorCategories.map((category) => (
            <>
              <Typography
                variant="h2"
                color={(theme) => theme.palette.grey[400]}
                sx={{ textAlign: 'center', mb: 4, mt: 4 }}
              >
                {category.name}
              </Typography>
              <ul
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                  gap: '40px 10px',
                  padding: '20px',
                  listStyle: 'none',
                  backgroundColor: '#ade1f7',
                }}
              >
                {category.sponsor &&
                  category.sponsor.map((sponsor, index) => (
                    <li style={{ flexBasis: '250px' }}>
                      <Sponsor
                        key={index}
                        image={sponsor.logo.url}
                        link={sponsor.url}
                        name={sponsor.name}
                      />
                    </li>
                  ))}
              </ul>
            </>
          ))}
      </Container>
    </PageContainer>
  );
};

const Sponsor = (props: { link: string; image: string; name?: string }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <img
          src={props.image}
          alt={props.name}
          {...props}
          style={{
            height: '100%',
            verticalAlign: 'middle',
            borderRadius: '0px',
            maxHeight: '75px',
          }}
        />
      </a>
    </div>
  );
};

export default Sponsors;
