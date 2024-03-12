import { iokLocalStorage } from '../utils';

const Logout = () => {
  iokLocalStorage('remove', 'iok_registration_data');
  iokLocalStorage('remove', 'welcome');
  iokLocalStorage('remove', 'ratings');
  window.location.href = '/';
  return null;
};

export default Logout;
