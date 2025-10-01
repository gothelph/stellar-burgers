import { ProfileUI } from '@ui-pages';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUser, update } from '../../services/slices/userSlice';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  if (!user) return <div>Загрузка...</div>;

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    Boolean(formValue.password);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isFormChanged) return;

    const data: Partial<TRegisterData> = {
      name: formValue.name,
      email: formValue.email,
      ...(formValue.password && { password: formValue.password })
    };

    dispatch(update(data));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
