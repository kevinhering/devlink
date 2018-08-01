import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import './App.css';

// store
import configureStore from './store/configureStore';

// action creators
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearProfile } from './actions/profileActions';

// utils
// import setAuthToken from './utils/setAuthToken';
import { setAuthToken, tokenIsValid } from './utils/utils';

// components
import AppNavbar from './components/layout/AppNavbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddProject from './components/project/AddProject';
import EditProject from './components/project/EditProject';
import AddResource from './components/resource/AddResource';
import EditResource from './components/resource/EditResource';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/common/NotFound';

const store = configureStore();

const checkAuthentication = () => {
  // check for auth token
  if (localStorage.jwtToken) {
    const { jwtToken: token } = localStorage;

    // extract token info & check expiration
    if (tokenIsValid(token)) {
      const decodedJwt = jwtDecode(token);
      // set auth header
      setAuthToken(token);
      // set user and isAuthenticated
      store.dispatch(setCurrentUser(decodedJwt));
    } else {
      store.dispatch(logoutUser());
      console.log('logging user out and clearing profile');
      store.dispatch(clearProfile());
      // redirect to login
      window.location.href = '/login';
    }
  }
};

class App extends Component {
  render() {
    checkAuthentication();

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route path="/" component={AppNavbar} />
            <Route exact path="/" component={Landing} />

            <Switch>
              <PublicRoute exact path="/register" component={Register} />
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/profiles" component={Profiles} />
              <PublicRoute exact path="/profile/:handle" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-project" component={AddProject} />
              <PrivateRoute exact path="/edit-project/:id" component={EditProject} />
              <PrivateRoute exact path="/add-resource" component={AddResource} />
              <PrivateRoute exact path="/edit-resource/:id" component={EditResource} />
              <PrivateRoute exact path="/postfeed" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
              <Route component={NotFound} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
