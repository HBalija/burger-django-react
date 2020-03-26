import * as actionTypes from './actions';

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
      }
    };

  case actionTypes.REMOVE_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingName]: state.ingredients[action.ingName] - 1
      }
    };

  default:
    return state;
  }
};
