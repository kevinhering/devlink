import axios from 'axios';
import jwtDecode from 'jwt-decode';

// set/remove authentication header
export const setAuthToken = token => {
  return token
    ? (axios.defaults.headers.common['Authorization'] = token)
    : delete axios.defaults.headers.common['Authorization'];
};

export const tokenIsValid = token => {
  let decodedToken;
  const current_time = Math.floor(Date.now().valueOf() / 1000);

  // decode token
  try {
    decodedToken = jwtDecode(token);
  } catch (err) {
    return false;
  }

  // check exp
  return !!token && decodedToken.exp > current_time;
};
