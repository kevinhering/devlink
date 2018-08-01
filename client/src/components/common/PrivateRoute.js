import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// reactstrap
import { Container } from 'reactstrap';

// prettier-ignore
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true 
        ? <Container><Component {...props} /></Container>
        : <Redirect to="/login" />
    }
  />
);

// proptypes
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

// Redux connect() options
// mapStateToProps
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
