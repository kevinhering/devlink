// IMPORTS
// - libraries
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducer
import rootReducer from '../reducers/index';

const initialState = {};

const middlewares = [thunk];

// note: additional preloadedState argument added to use redux devtools extension in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  // note: additional preloadedState argument added to use redux devtools extension in browser
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
};
