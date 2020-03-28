import axios from '../../axios';

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

const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};

const fetchOrdersSuccess = orders => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, orders };
};

const fetchOrdersFail = error => {
  return { type: actionTypes.FETCH_ORDERS_FAIL, error };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders')
      .then(response => {
        dispatch(fetchOrdersSuccess(response.data));
        // this.setState(() => ({ orders: response.data, loading: false }));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
