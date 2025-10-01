import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { Route, Routes, useLocation } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  Login,
  ForgotPassword,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
  NotFound404
} from '@pages';

import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { UserLogin } from '../routes/user-login';
import { UserDislogin } from '../routes/user-dislogin';
import { OrderDetailsModal } from '../modal/order-details-modal';
import { IngredientDetailsPage } from '../../pages/ingredient-details-page.tsx/ingredients-details-page';
import { getUser } from '../../services/slices/userSlice';
import { fetchIngredients } from '../../services/slices/ingredients';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* UserDislogin routes */}
        <Route
          path='/login'
          element={
            <UserDislogin>
              <Login />
            </UserDislogin>
          }
        />
        <Route
          path='/register'
          element={
            <UserDislogin>
              <Register />
            </UserDislogin>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <UserDislogin>
              <ForgotPassword />
            </UserDislogin>
          }
        />
        <Route
          path='/reset-password'
          element={
            <UserDislogin>
              <ResetPassword />
            </UserDislogin>
          }
        />

        {/* UserLogin routes */}
        <Route
          path='/profile'
          element={
            <UserLogin>
              <Profile />
            </UserLogin>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <UserLogin>
              <ProfileOrders />
            </UserLogin>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <UserLogin>
              <OrderInfo />
            </UserLogin>
          }
        />

        <Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Modals */}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => window.history.back()}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='/feed/:number' element={<OrderDetailsModal />} />
          <Route
            path='/profile/orders/:number'
            element={
              <UserLogin>
                <OrderDetailsModal />
              </UserLogin>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
