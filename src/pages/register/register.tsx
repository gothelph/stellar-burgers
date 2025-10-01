import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import { selectIsLoading } from '../../services/slices/profile';
import { Preloader } from '@ui';
import registerSlice, { register } from '../../services/slices/register';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isError = useSelector(registerSlice.selectors.selectIsError);
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let data = {
      name: userName,
      email,
      password
    };
    dispatch(register(data));
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
