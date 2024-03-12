import { Box as MuiBox, Container as MuiContainer } from '@mui/material';
import { useEffect } from 'react';
import { useSetPageTitle } from '../Store';

const PageContainer = (props: {
  children: React.ReactNode;
  container?: boolean;
  light?: boolean;
  title?: string;
}) => {
  const Parent = (props.container ? MuiContainer : MuiBox) as React.ElementType;
  return (
    <>
      <PageHeaderTitle title={props.title} />
      <Parent
        sx={{
          px: { md: 4, xs: 2 },
          pt: 2,
          pb: { xs: 4, md: 2 },
          backgroundColor: props.light ? 'primary.light' : 'primary.main',
          minHeight: '100%',
          position: 'relative',
        }}
      >
        {props.children}
      </Parent>
    </>
  );
};

export const PageHeaderTitle = (props: { title?: string }) => {
  const setPageTitle = useSetPageTitle();
  useEffect(() => {
    setPageTitle(props.title || '');
    return () => setPageTitle('');
  }, [props.title]);
  return null;
};

export default PageContainer;
