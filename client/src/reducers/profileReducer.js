import {
  PROFILE_LOADING,
  SET_PROFILE,
  CLEAR_PROFILE,
  SET_PROFILES
} from '../actions/types.js';

const initialState = {
  profile: null,
  profiles: null,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {}
      };

    case SET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
};
