import { POST_LOADING, SET_POSTS, SET_POST, CLEAR_POST } from '../actions/types.js';

const initialState = {
  posts: [],
  post: {},
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      };

    case SET_POST:
      return {
        ...state,
        post: action.payload,
        isLoading: false
      };

    case CLEAR_POST:
      return {
        ...state,
        post: {}
      };

    default:
      return state;
  }
};
