import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false // used for both purchasing burger and fetching orders
};

export default (state = initialState, action) => {

  switch (action.type) {

  case actionTypes.PURCHASE_BURGER_START:
    return {
      ...state,
      loading: true
    };

  case actionTypes.PURCHASE_BURGER_SUCCESS:
    return {
      ...state,
      loading: false,
      orders: [ ...state.orders, action.orderData ]
    };

  case actionTypes.PURCHASE_BURGER_FAIL:
    return {
      ...state,
      loading: false
    };

  case actionTypes.FETCH_ORDERS_START:
    return {
      ...state,
      loading: true
    };

  case actionTypes.FETCH_ORDERS_SUCCESS:
    return {
      ...state,
      orders: action.orders,
      loading: false
    };

  case actionTypes.FETCH_ORDERS_FAIL:
    return {
      ...state,
      loading: false
    };

  default:
    return state;
  }
};
