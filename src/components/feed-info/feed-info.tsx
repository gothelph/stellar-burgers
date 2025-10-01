import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectOrders,
  selectTotal,
  selectTotalToday
} from '../../services/slices/feed';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectOrders);
  const feed = {
    total: useSelector(selectTotal),
    totalToday: useSelector(selectTotalToday)
  };

  return (
    <FeedInfoUI
      readyOrders={getOrders(orders, 'done')}
      pendingOrders={getOrders(orders, 'pending')}
      feed={feed}
    />
  );
};
