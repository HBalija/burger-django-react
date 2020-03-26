import * as actionTypes from './actions';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  total_price: 4
};

export default (state = initialState, action) => {

  switch (action.type) {

  case actionTypes.ADD_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingName]: state.ingredients[action.ingName] + 1
      },
      total_price: state.total_price + INGREDIENT_PRICES[action.ingName]
    };

  case actionTypes.REMOVE_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingName]: state.ingredients[action.ingName] - 1
      },
      total_price: state.total_price + INGREDIENT_PRICES[action.ingName]
    };

  default:
    return state;
  }
};
