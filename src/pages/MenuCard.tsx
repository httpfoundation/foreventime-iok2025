import { PageContainer } from '../components';
import PageTitle from '../components/PageTitle';
import { StructuredText } from 'react-datocms';
import { useLiveStaticElements, useStaff } from '../Store';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const ManuCard = () => {
  const { menu: menuCard, menuImage } = useLiveStaticElements();
  return (
    <PageContainer container>
      <Box sx={{ textAlign: 'center' }}>
        <PageTitle>Étlap</PageTitle>
        <MenuImage src={menuImage?.url} />
        <StructuredText data={menuCard}></StructuredText>
      </Box>
    </PageContainer>
  );
};

const MenuImage = styled('img')`
  max-width: 100%;
`;

export default ManuCard;
