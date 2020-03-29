import * as actionTypes from '../actions/actionTypes';


const initialState = {
  accessToken: null,
  email: null,
  error: null,
  loading: false
};

const authReducer = (state = initialState, action) => {

  switch (action.type){

  case actionTypes.AUTH_START:
    return {
      ...state,
      error: null,
      loading: true
    };

  case actionTypes.AUTH_SUCCESS:
    return {
      ...state,
      error: null,
      loading: false,
      ...action.authData
    };

  case actionTypes.AUTH_FAIL:
    return {
      error: action.error,
      loading: false
    };

  case actionTypes.AUTH_LOGOUT:
    return {
      ...state,
      accessToken: null,
      email: null
    };

  default:
    return state;
  }
};

export default authReducer;
