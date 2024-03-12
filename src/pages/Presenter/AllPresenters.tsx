import { PageContainer, PageTitle } from '../../components';
import { usePresenters } from '../../Store';
import PresenterCard, { PresenterGrid } from '../../components/PresenterCard';

export const AllPresenters = () => {
  const presenters = usePresenters();

  return (
    <PageContainer>
      <PageTitle>Előadóink</PageTitle>

      <PresenterGrid>
        {presenters.map((presenter, index) => (
          <PresenterCard presenter={presenter} key={index} />
        ))}
      </PresenterGrid>
    </PageContainer>
  );
};
