import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';

// reactstrap
import { Container, Row, Col, Button } from 'reactstrap';

// components
import FormInputGroup from '../form/FormInputGroup';

// action creators
import { loginUser } from '../../actions/authActions';

export class Login extends Component {
  // state
  state = {
    email: '',
    password: '',
    errors: {}
  };

  //  proptypes
  static propTypes = {
    loginUser: func.isRequired,
    auth: object.isRequired,
    errors: object.isRequired
  };

  // lifecycle methods
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps) {
    // check auth
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    // sync state
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  // handlers
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    this.props.loginUser(user);
  };

  render() {
    // extract any errors from state
    const { errors } = this.state;

    return (
      <div className="login">
        <Container>
          <Row>
            <Col md="8" className="m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevLink account</p>
              <form onSubmit={this.onSubmit}>
                <FormInputGroup
                  type="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Email Address"
                  onChange={this.onChange}
                  required={true}
                  displayError={false}
                  error={errors.message}
                />
                <FormInputGroup
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.onChange}
                  required={true}
                  error={errors.message}
                />

                {}
                <Button color="info" block className="mt-4">
                  Login
                </Button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// Redux connect() options
// mapStateToProps
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// mapDispatchToProps (declared inline below)

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
