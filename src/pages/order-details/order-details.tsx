import { FC } from 'react';
import styles from './order-details.module.css';
import { OrderInfo } from '@components';
import { useParams } from 'react-router-dom';

export const OrderDetails: FC = () => {
  const { number } = useParams();

  return (
    <main className={`${styles.containerMain}`}>
      <span
        className={`${styles.title} text text_type_digits-default ${styles.number}`}
      >
        {`#${number}`}
      </span>
      <div className={`${styles.main} pl-5 pr-5`}>
        <OrderInfo />
      </div>
    </main>
  );
};
