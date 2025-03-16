import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Divider,
  Slide,
  Box,
  IconButton,
  Chip,
  Button,
} from '@mui/material';
import { StructuredText } from 'react-datocms';
import { PageContainer } from '../components';
import PageTitle from '../components/PageTitle';

import { useMessages } from '../Store';
import { DatoMessage } from '../types';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { Close as CloseIcon, AccessTime as TimeIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { iokLocalStorage } from '../utils';

const hideMessagesAfterMins = 15;

const MessageContainer = styled(Card)<{ notification?: boolean }>(
  ({ theme, notification }) => `
	padding: 0 0.5rem;
	border-radius: 0px;
	margin-bottom: 25px;
  z-index: 1000;
	${
    notification
      ? `
		border-bottom-right-radius: 0;
		h4 {
			font-size: 1.5rem;
		}
		p {
			font-size: 0.9rem !important;
		}
		max-width: 100vw;
	`
      : ``
  }
	p {
		font-size: 1rem;
	}
`,
);

const olderThan = (date: Date | string, limitMins: number) =>
  Math.round((new Date().getTime() - new Date(date).getTime()) / 1000 / 60) > limitMins;

const notificationTimeout = 10 * 1000;

const Message = (props: {
  message?: DatoMessage;
  notification?: boolean;
  onHide?: (id?: string) => void;
}) => {
  const [isIn, setIsIn] = React.useState(true);

  if (!props.message) return null;
  const { title, level, message, staff, createdAt } = props.message;
  const AnimContainer = props.notification
    ? Slide
    : (props: { children: React.ReactElement; in?: boolean }) => props.children;
  return (
    <AnimContainer in={isIn} direction="left">
      <MessageContainer notification={props.notification} elevation={3}>
        <CardContent sx={{ position: 'relative', color: 'text.secondary' }}>
          {props.notification && (
            <IconButton
              sx={{ position: 'absolute', top: '10px', right: '0' }}
              onClick={() => {
                if (props.onHide) props.onHide(props.message?.id);
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
          {staff && (
            <CardHeader
              avatar={<Avatar src={staff.image?.url}></Avatar>}
              title={staff.name}
              subheader="IOK 2025"
              titleTypographyProps={{ fontWeight: 600 }}
              sx={{ pb: 2, px: 0, pt: 1 }}
            />
          )}
          {!props.notification && (
            <Chip
              label={new Date(createdAt).toLocaleTimeString('hu-HU', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              icon={<TimeIcon />}
              sx={{ mb: 2 }}
            />
          )}
          <Typography variant="h4" fontWeight={700}>
            {title}
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            <StructuredText data={message} />
          </Typography>
        </CardContent>
      </MessageContainer>
    </AnimContainer>
  );
};

const MessageBoard = () => {
  const messages = useMessages();

  useEffect(() => {
    iokLocalStorage('set', 'readMessages', JSON.stringify(messages.map((m) => m.id)));
  }, [messages]);
  return (
    <PageContainer container>
      <PageTitle>Üzenőfal</PageTitle>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </PageContainer>
  );
};

export const MessageNotifications = () => {
  const messages = useMessages();

  const [readMessages, setReadMessages] = React.useState<(string | undefined)[]>(
    JSON.parse(iokLocalStorage('get', 'readMessages') || '[]'),
  );

  const [timeouts, setTimeouts] = React.useState<Record<string, number | null>>({});

  const unreadMessages = messages.filter(
    (message) =>
      !readMessages.includes(message.id) && !olderThan(message.createdAt, hideMessagesAfterMins),
  );
  const location = useLocation();

  useEffect(() => {
    unreadMessages.map((message) => {
      if (!timeouts[message.id]) {
        const timeout = window.setTimeout(() => {
          setReadMessages((readMessages) => [...readMessages, message.id]);
          iokLocalStorage(
            'set',
            'readMessages',
            JSON.stringify(
              JSON.parse(iokLocalStorage('get', 'readMessages') || '[]').concat(message.id),
            ),
          );
          setTimeouts((timeouts) => ({ ...timeouts, [message.id]: null }));
        }, notificationTimeout);
        setTimeouts((timeouts) => ({ ...timeouts, [message.id]: timeout }));
      }
    });
  }, [unreadMessages]);

  if (location.pathname.includes('uzenofal')) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        right: '20px',
        bottom: '0px',
        width: '500px',
        maxWidth: '90vw',
        color: 'text.primary',
      }}
    >
      {unreadMessages.slice(0, 2).map((message, index) => (
        <Message
          key={message.id}
          message={message}
          notification
          onHide={(id) => {
            if (!readMessages.includes(id)) {
              iokLocalStorage('set', 'readMessages', JSON.stringify([...readMessages, id]));
              setReadMessages([...readMessages, id]);
            }
          }}
        />
      ))}
      {unreadMessages.length > 2 && (
        <MoreUnreadMessages unreadMessagesCount={unreadMessages.length - 2} />
      )}
    </Box>
  );
};

const MoreUnreadMessages = (props: { unreadMessagesCount: number }) => {
  return (
    <MessageContainer sx={{ py: 1, px: 1.5, display: 'flex' }}>
      <Typography variant="h4" fontWeight={600} fontSize={17} sx={{ flex: 1, pt: '8px', pl: 1 }}>
        {props.unreadMessagesCount} további olvasatlan üzenet
      </Typography>
      <Link to="/uzenofal">
        <Button sx={{}} variant="outlined">
          Üzenőfal
        </Button>
      </Link>
    </MessageContainer>
  );
};

export default MessageBoard;
