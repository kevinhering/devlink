// ACTION TYPES
import { SET_ERRORS, CLEAR_ERRORS } from './types';

// set errors
export const setErrors = errorObj => dispatch => {
  dispatch({
    type: SET_ERRORS,
    payload: errorObj
  });
};

// clear errors
export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
    payload: {}
  });
};
