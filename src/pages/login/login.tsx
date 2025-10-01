import { FC, SyntheticEvent, useState, useCallback } from 'react';
import { LoginUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import { selectIsLoading } from '../../services/slices/profile';
import { Preloader } from '@ui';
import loginSlice, { login } from '../../services/slices/login';

export const Login: FC = () => {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(loginSlice.selectors.selectIsError);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(login({ email, password }));
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
