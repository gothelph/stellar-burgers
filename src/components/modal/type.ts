import { ReactNode } from 'react';

export type TModalProps = {
  title: string;
  titleClass?: string;
  onClose: () => void;
  children?: ReactNode;
};
