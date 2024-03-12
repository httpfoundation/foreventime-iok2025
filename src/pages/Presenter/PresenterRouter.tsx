import { Route, Routes } from 'react-router-dom';
import { AllPresenters } from './AllPresenters';
import { SinglePresenter } from './SinglePresenter';

const PresenterRouter = () => {
  return (
    <Routes>
      <Route index element={<AllPresenters />} />
      <Route path=":presenterSlug" element={<SinglePresenter />} />
    </Routes>
  );
};

export default PresenterRouter;
