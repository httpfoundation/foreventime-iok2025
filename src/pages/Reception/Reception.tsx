import { PageContainer } from '../../components';
import PageTitle from '../../components/PageTitle';
import { Container } from '@mui/material';
import Dashboard from '../../components/Dashboard';
import { DashboardElement } from '../../types';
import { useDashboardElements } from '../../Store';

const Reception = () => {
  const receptionDashboardItems: DashboardElement[] = useDashboardElements('reception');
  return (
    <PageContainer>
      <Container>
        <PageTitle>Információs pult</PageTitle>
        <Dashboard items={receptionDashboardItems} />
      </Container>
    </PageContainer>
  );
};

export default Reception;
