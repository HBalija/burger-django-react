import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import './Burger.scss';

const burger = () => {
  return (
    <div className="burger">
      <BurgerIngredient type="bread-top" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
