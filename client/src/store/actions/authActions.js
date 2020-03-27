import * as actionTypes from './actionTypes';


const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

const authSuccess = authData => {
  return { type: actionTypes.AUTH_FAIL, authData };
};

const authFail = error => {
  return { type: actionTypes.AUTH_FAIL, error };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
  };
};
