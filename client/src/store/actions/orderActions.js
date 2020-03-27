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
  return async dispatch => {
    dispatch(purchaseBurgerStart());
    // try {
    // //   const response = await axios.post('/orders/', orderData);
    //   const newOrder = { ...orderData, id: response.data.id };
    //   dispatch(purchaseBurgerSuccess(newOrder));
    //   return;
    // } catch (error) {
    //   dispatch(purchaseBurgerFail(error));
    // }
    return axios.post('/orders/', orderData)
      .then(response => {
        const newOrder = { ...orderData, id: response.data.id };
        dispatch(purchaseBurgerSuccess(newOrder));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};
