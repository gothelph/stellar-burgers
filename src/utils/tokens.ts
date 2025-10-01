import { TTokens } from '@utils-types';
import { deleteCookie, setCookie } from './cookie';

export const clearUserTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};

export const setUserTokens = (tokens: TTokens | null) => {
  if (!tokens) return;
  localStorage.setItem('refreshToken', tokens.refreshToken);
  setCookie('accessToken', tokens.accessToken);
};
