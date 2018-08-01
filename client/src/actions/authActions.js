import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { setAuthToken } from '../utils/utils';

// ACTION TYPES
import { SET_CURRENT_USER } from './types';

// ACTIONS
import { setErrors, clearErrors } from './errorActions';

// set user from jwt
export const setCurrentUser = tokenInfo => ({
  type: SET_CURRENT_USER,
  payload: tokenInfo
});

// ACTION CREATORS
// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      //clear errors
      dispatch(clearErrors());
      // re-route
      history.push('/login');
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// login user
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('api/users/login', userData)
    .then(res => {
      // clear errors
      dispatch(clearErrors());
      // save token
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // add token to auth header
      setAuthToken(token);
      // extract user info from token
      const decodedJwt = jwtDecode(token);
      dispatch(setCurrentUser(decodedJwt));
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// logout user
export const logoutUser = () => dispatch => {
  // delete token from localStorage & header
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  // sync state
  dispatch(setCurrentUser({}));
};
