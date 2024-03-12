import { useEffect, useState } from 'react';
import { useQuerySubscription } from 'react-datocms';
import { SiteClient } from 'datocms-client';
import { useRegistration } from './Store';
import { iokLocalStorage } from './utils';

export type QueryError = {
  code: string;
  message: string;
  fatal: boolean;
};

const useQuery = <T>(query: string, initialValue: T): [T, QueryError | null] => {
  const [result, setResult] = useState<T>(initialValue);

  const token = JSON.parse(iokLocalStorage('get', 'iok_registration_data') || '{}')?.dato_token;

  const { data, error } = useQuerySubscription({
    query,
    enabled: Boolean(token),
    token,
  });
  useEffect(() => {
    if (data) setResult(Object.keys(data).length === 1 ? data[Object.keys(data)[0]] : data);
  }, [data]);
  useEffect(() => {
    setResult(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return [result, error];
};

export const useDatoClient = () => {
  const [registration] = useRegistration();
  if (registration?.dato_token) return new SiteClient(registration.dato_token);
  else return null;
};

export default useQuery;
