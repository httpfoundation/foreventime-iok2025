import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListSubheader,
  Box,
  IconButton,
  Avatar,
  Divider,
  Fab,
  Tooltip,
  Zoom,
  useMediaQuery,
} from '@mui/material';
import { darken, useTheme } from '@mui/material/styles';

import {
  Home as HomeIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
  Coffee as CoffeeIcon,
  Star as StarIcon,
  EventNote as EventNoteIcon,
  LiveTv as LiveTvIcon,
  Logout as LogoutIcon,
  Info as InfoIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStages, usePageTitle, useRegistration, useError } from '../Store';
import iokLogoWide from '../assets/img/IOK Logo Wide.png';
import iokLogoNarrow from '../assets/img/IOK Logo Narrow.png';
//import iokLogo from "../assets/images/iok2022_logo_w_httpw_sm.png"
//import educationnextLogo from "../assets/images/educationnextlogo_inverz.png"
import { styled } from '@mui/system';

type MenuItem = {
  label: string;
  to: string;
  icon?: React.ReactElement;
  divider?: false;
};
type DividerMenuItem = {
  divider: true;
  label?: string;
  icon?: React.ReactElement;
};

const Header = () => {
  const isInfoButtonVisible = true;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [registration, loading] = useRegistration();
  const stages = useStages();
  const error = useError();

  const theme = useTheme();
  const underMd = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = useMemo<(MenuItem | DividerMenuItem)[]>(
    () => [
      { label: 'Köszöntő', to: '/koszonto', icon: <EventNoteIcon /> },
      { label: 'Program', to: '/eloadasok', icon: <EventNoteIcon /> },
      { label: 'Előadók', to: '/eloadok', icon: <PeopleIcon /> },
      { divider: true },
      {
        label: 'Szekciók',
        divider: true,
        icon: (
          <LiveTvIcon
            sx={{
              mr: 1,
              transform: 'translateY(5px)',
              color: 'rgba(0, 0, 0, 0.4)',
            }}
          />
        ),
      },
      ...stages.map((stage) => ({
        label: stage.name,
        to: `/szekcio/${stage.slug}`,
      })),
      { divider: true },
      { label: 'IOK Cafe', to: '/iok-cafe', icon: <CoffeeIcon /> },
      { label: 'Támogatók', to: '/tamogatok', icon: <StarIcon /> },
      { label: 'Értékelő űrlap', to: '/ertekeles', icon: <StarIcon /> },
      { divider: true },
      { label: 'Kijelentkezés', to: '/kijelentkezes', icon: <LogoutIcon /> },
    ],
    [stages],
  );

  const pageTitle = usePageTitle();
  useEffect(() => {
    document.title = pageTitle ? 'IOK 2025 | ' + pageTitle : 'IOK 2025';
  }, [pageTitle]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setDrawerOpen(false), [location.pathname]);

  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { bgcolor: (theme) => darken(theme.palette.primary.main, 0.35) } }}
      >
        <Box
          sx={{
            width: 370,
            pt: '64px',
            maxWidth: 'calc(100vw - 20px)',
            backgroundColor: 'primary.main',
          }}
          role="presentation"
        >
          <List>
            {menuItems.map((menuItem, index) => {
              if (menuItem.divider && menuItem.label)
                return (
                  <ListSubheader key={index}>
                    {menuItem.icon ?? null}
                    {menuItem.label}
                  </ListSubheader>
                );
              if (menuItem.divider) return <Divider key={index} />;
              const selected = menuItem.to === location.pathname;
              return (
                <ListItemButton
                  selected={selected}
                  key={index}
                  component={Link}
                  to={menuItem.to}
                  onClick={() => setDrawerOpen(false)}
                >
                  {menuItem.icon && (
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: selected ? 'secondary.main' : '' }}>
                        {menuItem.icon}
                      </Avatar>
                    </ListItemIcon>
                  )}
                  <ListItemText>
                    <span style={{ fontWeight: selected ? 600 : 500 }}>{menuItem.label}</span>
                  </ListItemText>
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box
        sx={{ position: 'absolute', left: 0, top: 0, zIndex: (theme) => theme.zIndex.drawer + 2 }}
      >
        <Link to="/">
          <img
            src={underMd ? iokLogoNarrow : iokLogoNarrow}
            alt="IOK Logo"
            style={{ height: '160px' }}
          />
        </Link>
      </Box>

      <AppBar
        position="fixed"
        color={'info' as any}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(90deg, #0D293D 0%, #246DA3 100%)',
          height: '60px',
        }}
      >
        <Toolbar sx={{ minHeight: '0 !important', height: '60px', color: '#fff' }}>
          <Typography
            variant="h6"
            noWrap
            sx={{ flex: 1, transform: 'translateY(3px)', textTransform: 'uppercase', color: '#fff', fontWeight: 'light', textAlign: 'left', paddingLeft: '220px' }}
            align="center"
          >
            Informatikai Oktatási Konferencia
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              flex: '0 0 auto',
              transform: 'translateY(2px)',
              mr: 2,
              display: { xs: 'none', md: 'block' },
              color: '#fff',
            }}
            align="center"
          >
            {registration?.id ? registration?.name : ''}
          </Typography>

          {!error && (
            <IconButton
              size="large"
              edge="start"
              color="default"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon sx={{
                color: '#fff',
              }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {!error && (
        <>
          {location.pathname !== '/' && (
            <Zoom in>
              <Tooltip title="Vissza az aulába" placement="bottom" arrow>
                <Fab
                  color="secondary"
                  aria-label="home"
                  sx={{
                    position: 'absolute',
                    right: 30,
                    top: { lg: 80, xs: 'unset' },
                    bottom: { lg: 'unset', xs: 10 },
                    zIndex: 800,
                  }}
                  component={Link}
                  to="/"
                >
                  <HomeIcon />
                </Fab>
              </Tooltip>
            </Zoom>
          )}

          {location.pathname !== '/infopult' && isInfoButtonVisible && (
            <Zoom in>
              <Tooltip title="Tovább az információs pulthoz" placement="bottom" arrow>
                <Fab
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    right: location.pathname !== '/' ? 100 : 30,
                    top: 80,
                    zIndex: 800,
                    display: { lg: 'flex', xs: 'none' },
                  }}
                  component={Link}
                  to="/infopult"
                >
                  <InfoIcon />
                </Fab>
              </Tooltip>
            </Zoom>
          )}

          {location.pathname !== '/' && !location.pathname.includes('/szekcio') && (
            <Zoom in>
              <Tooltip title="Vissza" placement="bottom" arrow>
                <Fab
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    right: location.pathname !== '/infopult' ? 100 : 100,
                    top: 80,
                    zIndex: 800,
                    display: { lg: 'flex', xs: 'none' },
                  }}
                  onClick={() => navigate(-1)}
                >
                  <ArrowBackIcon />
                </Fab>
              </Tooltip>
            </Zoom>
          )}
        </>
      )}
    </>
  );
};

const Logo = styled('img')`
  padding-top: 5px;
  height: 38px;
  /*width: 207px;*/
`;

export default Header;
