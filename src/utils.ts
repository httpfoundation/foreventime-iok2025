export const iokLocalStorage = (
  action: 'get' | 'set' | 'remove',
  key: string,
  value?: string | null,
): string | null => {
  const eventId = process.env.REACT_APP_EVENT_ID || 'iok';
  const eventKey = key ? key + '_' + eventId : eventId;
  if (action === 'get') {
    return window.localStorage.getItem(eventKey);
  } else if (action === 'set') {
    window.localStorage.setItem(eventKey, value as string);
  } else if (action === 'remove') {
    window.localStorage.removeItem(eventKey);
  }
  return null;
};
