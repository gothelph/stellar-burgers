import { FC } from 'react';
import { IngredientDetails } from '@components';
import styles from './ingredients-details-page.module.css';

export const IngredientDetailsPage: FC = () => (
  <main className={`${styles.containerMain}`}>
    <span className={`${styles.title} text text_type_main-large`}>
      Детали ингредиента
    </span>
    <div className={`${styles.main} pl-5 pr-5`}>
      <IngredientDetails />
    </div>
  </main>
);
