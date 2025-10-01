import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalRoot = document.getElementById('modals') as HTMLDivElement;

export const Modal: FC<TModalProps> = memo(
  ({ title, titleClass, onClose, children }) => {
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [onClose]);

    return ReactDOM.createPortal(
      <ModalUI title={title} titleClass={titleClass} onClose={onClose}>
        {children}
      </ModalUI>,
      modalRoot
    );
  }
);
