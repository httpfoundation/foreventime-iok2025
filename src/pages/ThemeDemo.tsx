import { PageContainer } from '../components';
import PageTitle from '../components/PageTitle';
import { Box } from '@mui/material';
import { PresenterGrid } from '../components/PresenterCard';
import theme from '../theme';

const IokTheme = () => {
  const {
    mode,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset,
    divider,
    background,
    action,
    ...themeColors
  } = theme.palette;
  type colorType = { mainCategory: string; subCategory: string; value: any };
  let colors: colorType[] = [];
  Object.entries(themeColors).forEach(([key, value]) => {
    const colorEntries = Object.entries(value).map(([key2, value2]) => {
      return { mainCategory: key, subCategory: key2, value: value2 };
    });
    colors = [...colors, ...colorEntries];
  });

  return (
    <PageContainer container>
      <PageTitle>Virtuális konferenciaközpont téma</PageTitle>

      <PresenterGrid columns={{ xs: 4, sm: 4, lg: 4 }}>
        {colors.map((color, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              height: '100%',
              minHeight: '6rem',
              backgroundColor: `${color.value}`,
              borderColor: '#555555',
              borderStyle: 'solid',
              borderWidth: '1px',
              color: '#ccc',
              p: 2,
            }}
          >
            {color.mainCategory}.{color.subCategory} : {color.value}
          </Box>
        ))}
      </PresenterGrid>
    </PageContainer>
  );
};

export default IokTheme;
