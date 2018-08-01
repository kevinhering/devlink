import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Row, Col, Button } from 'reactstrap';

class Landing extends Component {
  // lifecycle methods
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <Container>
            <Row>
              <Col md="12" className="text-center">
                <h1 className="display-3 mb-4">DevLink</h1>
                <h2 className="mb-5">Knowledge Sharing for Dev Teams</h2>
                <p className="lead">
                  {' '}
                  Create a developer profile/portfolio, add resources and projects, post
                  messages and get help from other developers
                </p>
                <hr />
                <Button
                  tag={Link}
                  to={'/register'}
                  color="info"
                  size="lg"
                  className="mr-2"
                >
                  Sign Up
                </Button>
                <Button tag={Link} to={'/login'} color="light" size="lg">
                  Login
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

// proptypes
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

// Redux connect() options
// mapStateToProps
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
