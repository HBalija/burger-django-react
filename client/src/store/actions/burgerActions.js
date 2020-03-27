import axios from '../../axios-order';

import * as actionTypes from './actionTypes.js.js';


export const addIngredient = ingName => {
  return { type: actionTypes.ADD_INGREDIENT, ingName };
};

export const removeIngredient = ingName => {
  return { type: actionTypes.REMOVE_INGREDIENT, ingName };
};

const setIngredients = ingredients => {
  return { type: actionTypes.SET_INGREDIENTS, ingredients };
};

const fetchIngredientsFailed =  () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
};

export const fetchIngredients = () => {
  return dispatch => {
    axios.get('/ingredients/')
      .then(response => {
        dispatch(setIngredients(response.data));
      }).catch(error => {
        console.log(error); // eslint-disable-line no-console
        dispatch(fetchIngredientsFailed());
      });
  };
};
