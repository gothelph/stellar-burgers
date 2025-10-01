import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import {
  register,
  selectRegisterError,
  selectIsLoading,
  selectUser,
  selectTokens
} from '../../services/slices/userSlice';
import { setUserTokens } from '../../utils/tokens';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const isError = useSelector(selectRegisterError);
  const isLoading = useSelector(selectIsLoading);
  const tokens = useSelector(selectTokens);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let data = {
      name: userName,
      email,
      password
    };
    try {
      await dispatch(register(data));
      setUserTokens(tokens);
    } catch (e) {
      console.error('Failed to register user:', e);
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={isError ? 'Проверьте правильность введённых данных' : ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
