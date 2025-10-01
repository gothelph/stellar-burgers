import React, { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIsLoading, selectUser } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

interface DisloginProps {
  children: ReactNode;
}

export const UserDislogin: FC<DisloginProps> = ({ children }) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) return <Preloader />;

  if (user) {
    const from = location.state?.from;
    return from ? (
      <Navigate replace to={from} />
    ) : (
      <Navigate replace to='/profile' />
    );
  }

  return <>{children}</>;
};
