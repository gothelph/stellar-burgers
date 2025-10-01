import { FC, SyntheticEvent, useState, useCallback } from 'react';
import { LoginUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import {
  login,
  selectLoginError,
  selectIsLoading,
  selectTokens
} from '../../services/slices/userSlice';
import { setUserTokens } from '../../utils/tokens';

export const Login: FC = () => {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectLoginError);
  const tokens = useSelector(selectTokens);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      try {
        await dispatch(login({ email, password }));
        setUserTokens(tokens);
      } catch (e) {
        console.error('Failed to login user:', e);
      }
    },
    [dispatch, email, password]
  );

  return isLoading ? (
    <Preloader />
  ) : (
    <LoginUI
      errorText={isError ? 'Неверный логин или пароль' : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
