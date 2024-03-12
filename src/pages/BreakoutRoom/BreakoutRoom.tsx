import { CircularProgress, Container, Box, Grid, AppBar, Typography } from '@mui/material';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BackButton, PageContainer, PageTitle } from '../../components';
import Dashboard from '../../components/Dashboard';
import { useBreakoutRooms, useRegistration } from '../../Store';
import { DashboardElement, DashboardItemType, DatoBreakoutRoom } from '../../types';

import iokCafe0 from '../../assets/images/iokcafe.png';
import iokCafe1 from '../../assets/images/iokcafe2.png';
import iokCafe2 from '../../assets/images/iokcafe3.png';
import iokCafe3 from '../../assets/images/iokcafe4.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { StructuredText } from 'react-datocms';
import { useLiveStaticElements } from '../../Store';

const WebexWidget = lazy(() => import('./WebexWidget'));

type WebexRoom = {
  id: string;
  title: string;
  created: string;
};

const Loader = (props: { size?: number }) => (
  <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
    <CircularProgress size={props.size || 60} />
  </Box>
);

type WebexRoomDashboardItem = DashboardItemType;

//IOK Cafe
const BreakoutRoom = () => {
  const [registration] = useRegistration();
  const { iokCafe: iokCafeInfoText } = useLiveStaticElements();
  const { iokCafeHandout } = useLiveStaticElements();
  //const [rooms, setRooms] = useState<WebexRoom[]>([])
  const rooms = useBreakoutRooms().filter((room) => room.enabled);
  const [error, setError] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<DatoBreakoutRoom | null>(null);
  const [meetingDestination, setMeetingDestination] = useState<string | null>(null);
  const [meetingDestinationLoading, setMeetingDestinationLoading] = useState(false);
  //const [roomsLoading, setRoomsLoading] = useState(true)

  /*
	useEffect(() => {
		fetch("https://webexapis.com/v1/rooms", {
			method: "GET",
			headers: {
				"Authorization": "Bearer " + registration?.webex_access_token,
				"Content-Type": "application/json"
			}
		}).then(res => res.json()).then(data => {
			setRooms(data.items.sort((a:WebexRoom, b:WebexRoom) => (new Date(a.created)).getTime()-(new Date(b.created)).getTime()).slice(1))
			setRoomsLoading(false)
			if (rooms.length === 0) setError(true)
		})
	}, [])
	*/

  useEffect(() => {
    if (selectedRoom) {
      setMeetingDestination(null);
      setMeetingDestinationLoading(true);

      fetch('https://wy8qg2hpoh.execute-api.eu-west-1.amazonaws.com/default/iokAddToRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: selectedRoom.roomId,
          access_token: registration?.webex_access_token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          fetch('https://webexapis.com/v1/rooms/' + selectedRoom.roomId + '/meetingInfo', {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + registration?.webex_access_token,
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setMeetingDestinationLoading(false);
              setMeetingDestination(data.meetingLink);
            });
        });
    } else {
      setMeetingDestination(null);
    }
  }, [selectedRoom]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes('webex')) setMeetingDestination(null);
  }, [location.pathname]);

  /* 	useEffect(() => {
		if (rooms.length===1) {
			setSelectedRoom(rooms[0])
			navigate("/iok-cafe/webex")
		}
	}, [rooms]) */

  const iokCafeImages = [iokCafe0, iokCafe1, iokCafe2, iokCafe3];

  const dashboardItems: DashboardElement[] = rooms.map((room, index) => ({
    caption: room.title,
    mobileOrder: index,
    title: '',
    light: true,
    img: { url: iokCafeImages[index % iokCafeImages.length] },
    //img: iokCafeImages[index],
    corner: 'none',
    onClick: () => {
      setSelectedRoom(room);
      navigate('/iok-cafe/webex');
    },
    enabled: true,
    dashboardType: 'cafe',
  }));

  if (meetingDestination) console.log('Meeting destination:', meetingDestination);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PageTitle>{selectedRoom?.title || 'IOK Cafe'}</PageTitle>
      {/* {(error) ? <PageContainer container><Typography>Opsz, valami gond van az IOK Cafeba történő bejutásoddal. Írj nekünk <a href="mailto:info@iok.httpf.hu">info@iok.httpf.hu</a> címre, és megpróbáljuk gyorsan megoldani a problémát!</Typography></PageContainer>: null} */}
      <>
        {!meetingDestinationLoading && !meetingDestination ? (
          <PageContainer container>
            <Box sx={{ textAlign: 'center', pb: 4 }}>
              <StructuredText data={iokCafeInfoText} />
            </Box>
            <Dashboard items={dashboardItems} />
          </PageContainer>
        ) : null}
        {meetingDestinationLoading || meetingDestination ? (
          <Grid container sx={{ width: '100%', height: '100%' }}>
            <Grid
              item
              xs={12}
              lg={9}
              sx={{ maxHeight: '100%', position: 'relative', backgroundColor: '#171717' }}
            >
              <Suspense
                fallback={
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <Loader size={60} />
                  </Box>
                }
              >
                {meetingDestinationLoading ? (
                  <Loader />
                ) : (
                  <WebexWidget destination={meetingDestination} />
                )}
              </Suspense>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: 'calc(100%)',
                  height: '100%',
                  position: 'relative',
                }}
              >
                {/* <AppBar component="div" position="relative" color="default" sx={{px: 2, bgcolor: "#ace8ea"}} elevation={1}>
								<BackButton onClick={() => setSelectedRoom(null)} />
								<h1>
									{selectedRoom?.title}
								</h1>
							</AppBar> */}
                <Box sx={{ p: 3, fontSize: '0.85rem' }}>
                  <StructuredText data={iokCafeHandout} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : null}
      </>
    </Box>
  );
};

export default BreakoutRoom;
