import { PageContainer, PageTitle } from '../../components';
import { DashboardElement } from '../../types';
import Dashboard from '../../components/Dashboard';
import { useMemo } from 'react';
import { useDashboardElements } from '../../Store';

const Home = () => {
  const dashboardElements = useDashboardElements('home');
  const homeDashboardItems: DashboardElement[] = useMemo(
    () => [...dashboardElements],
    [dashboardElements],
  );
  return (
    <PageContainer container>
      <PageTitle>IOK 2024 Aula</PageTitle>
      <Dashboard items={homeDashboardItems} />
    </PageContainer>
  );
};

export default Home;
