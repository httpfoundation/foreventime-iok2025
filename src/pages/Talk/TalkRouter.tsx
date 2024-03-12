import { Route, Routes } from 'react-router-dom';
import { AllTalks } from './AllTalks';
import { SingleTalk } from './SingleTalk';

const TalkRouter = () => {
  return (
    <Routes>
      <Route index element={<AllTalks />} />
      <Route path=":talkSlug" element={<SingleTalk />} />
    </Routes>
  );
};

export default TalkRouter;
