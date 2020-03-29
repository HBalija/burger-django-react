import * as actionTypes from './actionTypes';
import axios from '../../axios';


// amount of time our token is valid in miliseconds (current fake data)
const EXPIRATION_TIME = 3600 * 1000;


const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

const authSuccess = authData => {
  return { type: actionTypes.AUTH_SUCCESS, authData };
};

const authFail = error => {
  return { type: actionTypes.AUTH_FAIL, error };
};

export const logout = () => {

  localStorage.removeItem('userData');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const checkAuthTimeout = (expirationTimeInMiliSeconds) => {
  /* will automatically logout when token expires */
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
      // setTimeout takes time in miliseconds
    }, expirationTimeInMiliSeconds);
  };
};

const obtainToken = async (dispatch, authData) => {
/* helper function for retrieving token on LOGIN and REGISTER */

  const response = await axios.post('/api/token/obtain/', authData);

  // Date object of current time + expiration time in miliseconds
  const expirationDate = new Date(new Date().getTime() + EXPIRATION_TIME);
  const data = {
    email: authData.email,
    accessToken: response.data.access,
    // refreshToken: response.data.refresh,
    expirationDate
  };
  dispatch(authSuccess(data));
  dispatch(checkAuthTimeout(EXPIRATION_TIME));
  localStorage.setItem('userData', JSON.stringify(data));
  return 'SUCCESS'; // not required anymore cause we use redirect component in auth container
};


export const authCheckState = () => {
  return dispatch => {

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      const expirationDate = new Date(userData.expirationDate);

      if (expirationDate > new Date()) {
        const accessToken = userData.accessToken;
        const email = userData.email;
        dispatch(authSuccess({ accessToken, email }));
        // dispatch time delta to calculate time our token is valid
        dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
      } else {
      // logout if expiration date is less than current date
        dispatch(logout());
      }
    }
  };
};

export const auth = (authData, method) => {
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
      return obtainToken(dispatch, authData)
        .catch(error => {
          dispatch(authFail(error));
        });
    }
  };
};
