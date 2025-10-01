import React, { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIsLoading, selectUser } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

interface LoginProps {
  children: ReactNode;
}

export const UserLogin: FC<LoginProps> = ({ children }) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) return <Preloader />;

  if (!user) return <Navigate to='/login' state={{ from: location }} />;

  return <>{children}</>;
};
