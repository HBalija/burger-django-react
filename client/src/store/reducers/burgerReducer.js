import * as actionTypes from '../actions/actionTypes';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  error: false,
  total_price: 4,
  building: false // use to check if user proceed with authentication after building a burger
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
      total_price: state.total_price + INGREDIENT_PRICES[action.ingName],
      building: true
    };

  case actionTypes.REMOVE_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingName]: state.ingredients[action.ingName] - 1
      },
      total_price: state.total_price - INGREDIENT_PRICES[action.ingName],
      building: true
    };

  case actionTypes.SET_INGREDIENTS:
    return {
      ...state,
      ingredients: action.ingredients,
      error: false,
      total_price: initialState.total_price,
      building: false
    };

  case actionTypes.FETCH_INGREDIENTS_FAILED:
    return {
      ...state,
      error: true
    };

  default:
    return state;
  }
};
