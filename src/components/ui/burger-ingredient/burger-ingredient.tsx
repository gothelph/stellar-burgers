import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const { image, price, name, _id } = ingredient;

    return (
      <li className={styles.container}>
        <Link
          to={`/ingredients/${_id}`}
          state={locationState}
          className={styles.article}
        >
          {count ? <Counter count={count} /> : null}
          <img src={image} alt='картинка ингредиента.' className={styles.img} />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <AddButton
          onClick={handleAdd}
          text='Добавить'
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
