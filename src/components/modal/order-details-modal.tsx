import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Modal, OrderInfo } from '@components';

export const OrderDetailsModal: FC = () => {
  const { number } = useParams();

  return (
    <Modal
      title={`#${number}`}
      titleClass='text_type_digits-default'
      onClose={() => window.history.back()}
    >
      <OrderInfo />
    </Modal>
  );
};
