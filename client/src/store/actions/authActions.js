import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

const authSuccess = authData => {
  return { type: actionTypes.AUTH_SUCCESS, authData };
};

const authFail = error => {
  return { type: actionTypes.AUTH_FAIL, error };
};

const obtainToken = async (dispatch, authData) => {
/* helper function for retrieving token on LOGIN and REGISTER */

  const response = await axios.post('/api/token/obtain/', authData);

  const data = {
    email: authData.email,
    isAuthenticated: !!response.data.access,
    accessToken: response.data.access,
    refreshToken: response.data.refresh,
  };

  console.log(data);
  dispatch(authSuccess(data));
  // localStorage.setItem('bookmarksData', JSON.stringify(data));
};

export const Auth = (authData, method) => {
  return async dispatch => {

    dispatch(authStart());

    if (method === 'signup') {
      return axios.post('/register/', authData)
        .then(() => {
          obtainToken(dispatch, authData);
        })
        .catch(error => {
          dispatch(authFail(error));
        });
    } else {
      return obtainToken(dispatch, authData);
    }
  };
};

/*
export const onRefreshAuthenticate = () => {
  const data = JSON.parse(localStorage.getItem('bookmarksData'));
  return {
    type: 'AUTHENTICATE',
    data
  };
};

export const onLoadAuthenticate = data => {
  return {
    type: 'AUTHENTICATE',
    data
  };
};

// LOGOUT

export const logout = () => {
  localStorage.removeItem('bookmarksData');
  return {
    type: 'LOGOUT'
  };
};

*/
