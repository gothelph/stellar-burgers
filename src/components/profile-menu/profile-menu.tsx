import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/slices/userSlice';
import { clearUserTokens } from '../../utils/tokens';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      clearUserTokens();
    } catch (e) {
      console.error('Failed to logout:', e);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
