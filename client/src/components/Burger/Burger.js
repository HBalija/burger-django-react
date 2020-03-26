import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import './Burger.scss';


const Burger = ({ ingredients }) => {

  // convert object to array of keys (array of arrays)
  const transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
      return [...Array(ingredients[igKey])]
        .map((_, idx) => {
          return <BurgerIngredient key={igKey + idx} type={igKey} />;
        });
    });

  // convert to array of elements so length can be calculated
  let reducedIngredients = transformedIngredients.reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  if (!reducedIngredients.length) {
    reducedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className="burger">
      <BurgerIngredient type="bread-top" />
      {reducedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
