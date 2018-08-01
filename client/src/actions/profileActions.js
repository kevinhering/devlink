import axios from 'axios';

// ACTION TYPES
import { SET_PROFILE, PROFILE_LOADING, CLEAR_PROFILE, SET_PROFILES } from './types';

// ACTIONS
import { setErrors, clearErrors } from './errorActions';

// set profile loading state
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// set current profile
export const setProfile = profile => ({
  type: SET_PROFILE,
  payload: profile
});

// clear profile
export const clearProfile = () => ({
  type: CLEAR_PROFILE
});

// set profiles
export const setProfiles = profiles => ({
  type: SET_PROFILES,
  payload: profiles
});

// ACTION CREATORS
// get current profile
export const getCurrentProfile = () => dispatch => {
  // set loading state
  dispatch(setProfileLoading());
  // request profile
  axios
    .get('/api/profile')
    .then(res => dispatch(setProfile(res.data)))
    .catch(err => dispatch(setProfile({})));
};

// create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => {
      dispatch(clearErrors());
      return history.push('/dashboard');
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// add project
export const addProject = (projectData, history) => dispatch => {
  axios
    .post('/api/profile/projects', projectData)
    .then(res => {
      dispatch(clearErrors());
      return history.push('/dashboard');
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// edit project
export const editProject = (projectData, projectId, history) => dispatch => {
  axios
    .put(`/api/profile/projects/${projectId}`, projectData)
    .then(res => {
      dispatch(clearErrors());
      return history.push('/dashboard');
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// delete project
export const deleteProject = projectID => dispatch => {
  const URL = `/api/profile/projects/${projectID}`;
  axios
    .delete(URL)
    .then(res => {
      return dispatch(setProfile(res.data));
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// add resource
export const addResource = (resourceData, history) => dispatch => {
  axios
    .post('/api/profile/resources', resourceData)
    .then(res => {
      dispatch(clearErrors());
      return history.push('/dashboard');
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// edit resource
export const editResource = (resourceData, resourceId, history) => dispatch => {
  axios
    .put(`/api/profile/resources/${resourceId}`, resourceData)
    .then(res => {
      dispatch(clearErrors());
      return history.push('/dashboard');
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// delete resource
export const deleteResource = resourceID => dispatch => {
  const URL = `/api/profile/resources/${resourceID}`;
  axios
    .delete(URL)
    .then(res => {
      return dispatch(setProfile(res.data));
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

// get all profiles
export const getProfiles = () => dispatch => {
  // set loading state
  dispatch(setProfileLoading());
  // request profiles
  axios
    .get('/api/profile/all')
    .then(res => dispatch(setProfiles(res.data)))
    .catch(err => dispatch(setProfiles(null)));
};

// get profile (by handle)
export const getProfileByHandle = handle => dispatch => {
  // set loading state
  dispatch(setProfileLoading());
  // request profiles
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => dispatch(setProfile(res.data)))
    .catch(err => {
      console.log(err);
      return dispatch(setProfile(null));
    });
};
