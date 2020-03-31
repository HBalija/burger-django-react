import authReducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';


const initialState = {
  accessToken: null,
  email: null,
  error: null,
  loading: false
};

describe('authReducer', () => {
  it('should return initial state if invalid action passed', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should store token upon login', () => {
    expect(authReducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      token: 'myFakeToken',
      email: 'test@example.com'
    })).toEqual({
      accessToken: 'myFakeToken',
      email: 'test@example.com',
      error: null,
      loading: false
    });
  });

});
