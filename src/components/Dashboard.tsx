import { Grid, useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Bubble from './Bubble/Bubble';
import { DashboardElement } from '../types';
import React, { useMemo } from 'react';

interface DashboardItemProps {
  title?: string;
  subtitle?: string;
  corner?: 'bl' | 'br' | 'tl' | 'tr' | 'none';
  size?: 'xs' | 'lg' | 'xl' | 'xxl' | 'sm' | 'md';
  color?: 'light' | 'primary';
  shadow?: boolean;
  smallText?: boolean;
  darkText?: boolean;
  icon?: boolean;
  children?: React.ReactNode;
  img?: any;
  hoverImg?: any;
  caption?: string;
  to?: string;
  external?: boolean;
  xs: number;
  xl?: number;
  lg?: number;
  md?: number;
  imgWidth?: string;
  empty?: boolean;
  light?: boolean;
  timeout?: number;
  tooltipPlacement?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | undefined;
  position?: 'top' | 'bottom';
  onMobile?: boolean;
  index?: number;
  onClick?: () => void;
}

const Dashboard = (props: { items: DashboardElement[] }) => {
  const { items } = props;
  const theme = useTheme();
  const upperThanLg = useMediaQuery(theme.breakpoints.up('lg'));
  const upperThanMd = useMediaQuery(theme.breakpoints.up('md'));
  const upperThanXl = useMediaQuery(theme.breakpoints.up('xl'));
  const upperThanSm = useMediaQuery(theme.breakpoints.up('sm'));
  const size = upperThanXl
    ? 'xl'
    : upperThanLg
    ? 'lg'
    : upperThanMd
    ? 'md'
    : upperThanSm
    ? 'sm'
    : 'xs';
  const xs = 6;
  const md = 3;
  const xl = 3;
  const lg = 3;
  const onMobile = !upperThanMd;

  const sortedItems = useMemo(
    () => (!upperThanMd ? [...items].sort((a, b) => a.mobileOrder - b.mobileOrder) : [...items]),
    [items, upperThanMd],
  );
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: onMobile ? '130%' : '100%',
        transform: onMobile ? 'translateX(-12.5%)' : 'unset',
      }}
    >
      <Grid
        container
        direction={'row'}
        spacing={0}
        sx={{ maxHeight: 'calc(100vh - 162px)', maxWidth: size === 'xl' ? '100%' : '90%' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {sortedItems.map((item, key) => {
          const { caption, title, corner, light, img, link, onClick, hoverImg, external } = item;
          return (
            <DashboardItem
              caption={caption}
              img={img?.url || ''}
              hoverImg={hoverImg?.url || ''}
              to={link}
              external={external}
              xs={xs}
              xl={xl}
              lg={lg}
              md={md}
              size={size}
              title={title}
              light={light}
              corner={corner}
              onClick={onClick}
              key={key + (upperThanMd ? 'mobile' : 'desktop')}
              timeout={1000}
              tooltipPlacement={key < 4 ? 'top' : 'bottom'}
              position={key < 4 ? 'bottom' : 'top'}
              onMobile={onMobile}
              index={key}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export const DashboardItem = (props: DashboardItemProps) => {
  const {
    img,
    caption,
    title,
    to,
    imgWidth,
    corner,
    size,
    xs,
    xl,
    lg,
    empty,
    light,
    timeout,
    tooltipPlacement,
    onClick,
    hoverImg,
    external,
    md,
    position,
    onMobile,
    index,
  } = props;

  if (empty) return <Grid item xs={xs} xl={xl} lg={lg} display="flex"></Grid>;

  return (
    <Grid
      item
      xs={xs}
      xl={xl}
      lg={lg}
      md={md}
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      style={{ position: 'relative' }}
    >
      <Bubble
        size={size}
        corner={corner}
        light={light}
        to={to}
        external={external}
        onClick={onClick}
        caption={caption}
        timeout={timeout}
        title={title || ''}
        tooltipPlacement={tooltipPlacement}
        img={img}
        hoverImg={hoverImg}
        imgWidth={imgWidth}
        position={position}
        onMobile={onMobile}
        index={index}
      />
    </Grid>
  );
};

export default Dashboard;
