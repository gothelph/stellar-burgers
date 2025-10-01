import { FC, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';

import {
  clearConstructor,
  selectConstructorItems
} from '../../services/slices/burger-constructor';
import {
  clearPlacedOrderData,
  placeOrder,
  selectOrderRequest,
  selectPlacedOrderData
} from '../../services/slices/order';
import { selectUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectPlacedOrderData);

  const onOrderClick = () => {
    if (orderRequest || !constructorItems.bun) return;
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    const { bun, ingredients } = constructorItems;
    const ingredientsIds = [bun._id, ...ingredients.map((i) => i._id), bun._id];
    dispatch(placeOrder(ingredientsIds));
  };
  useEffect(() => {
    if (orderModalData) {
      dispatch(clearConstructor());
    }
  }, [orderModalData, dispatch]);
  const closeOrderModal = () => dispatch(clearPlacedOrderData());
  const price = useMemo(() => {
    const { bun, ingredients } = constructorItems;
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (total, item) => total + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
