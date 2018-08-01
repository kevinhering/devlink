import axios from 'axios';

// ACTION TYPES
import { POST_LOADING, SET_POSTS, SET_POST, CLEAR_POST } from './types';

// ACTIONS
import { setErrors, clearErrors } from './errorActions';

// set post loading state
export const setPostLoading = () => ({
  type: POST_LOADING
});

// set posts
export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts
});

// set post
export const setPost = post => ({
  type: SET_POST,
  payload: post
});

// clear post
export const clearPost = () => ({
  type: CLEAR_POST
});

// ACTION CREATORS
// get posts
export const getPosts = () => dispatch => {
  // set loading state
  dispatch(setPostLoading());

  // make request
  axios
    .get('/api/posts')
    .then(res => dispatch(setPosts(res.data)))
    .catch(err => dispatch(getPosts({})));
};

// add a post
export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res => {
      dispatch(clearErrors());
      dispatch(setPost(res.data));
      return dispatch(getPosts());
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// get existing post
export const getPost = postId => dispatch => {
  // set loading state
  dispatch(setPostLoading());

  // get post by id
  axios
    .get(`/api/posts/${postId}`)
    .then(res => dispatch(setPost(res.data)))
    .catch(err => {
      dispatch(setErrors(err.response.data));
      return dispatch(setPost({}));
    });
};

// edit existing post
export const editPost = (postId, postData) => dispatch => {
  axios
    .put(`/api/posts/${postId}`, postData)
    .then(res => {
      dispatch(clearErrors());
      return dispatch(setPost(res.data));
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// delete a post
export const deletePost = postId => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch(setErrors(err.response.data)));
};

// add a comment to a post
export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => {
      dispatch(clearErrors());
      return dispatch(setPost(res.data));
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// edit existing comment
export const editComment = (postId, commentId, commentData) => dispatch => {
  axios
    .put(`/api/posts/comment/${postId}/${commentId}`, commentData)
    .then(res => {
      dispatch(clearErrors());
      return dispatch(setPost(res.data));
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// remove an existing comment from a post
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch(setPost(res.data)))
    .catch(err => {
      dispatch(setErrors(err.response.data));
      return dispatch(getPost(postId));
    });
};

// add like to a post
export const likePost = postId => dispatch => {
  axios
    .post(`/api/posts/like/${postId}`)
    .then(res => {
      dispatch(setPost(res.data));
      return dispatch(getPosts());
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// remove like from a post
export const unlikePost = postId => dispatch => {
  // post to API
  axios
    .post(`/api/posts/unlike/${postId}`)
    .then(res => {
      dispatch(setPost(res.data));
      return dispatch(getPosts());
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};
