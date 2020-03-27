import axios from '../../axios-order';

import * as actionTypes from './actionTypes';


const purchaseBurgerSuccess = orderData => {
  return { type: actionTypes.PURCHASE_BURGER_SUCCESS, orderData };
};

const purchaseBurgerFail = error => {
  return { type: actionTypes.PURCHASE_BURGER_FAIL, error };
};

const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders/', orderData)
      .then(response => {
        const newOrder = { ...orderData, id: response.data.id };
        dispatch(purchaseBurgerSuccess(newOrder));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
