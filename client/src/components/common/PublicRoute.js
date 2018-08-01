import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// reactstrap
import { Container } from 'reactstrap';

// prettier-ignore
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => <Container><Component {...props} /></Container>}
  />
);

// proptypes
PublicRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

// Redux connect() options
// mapStateToProps
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PublicRoute);
