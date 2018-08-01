import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';  // not needed as long as component is a child of Router component

// reactstrap
import { Container, Row, Col, Button } from 'reactstrap';

// components
import FormInputGroup from '../form/FormInputGroup';

// action creators
import { registerUser } from '../../actions/authActions';

export class Register extends Component {
  // state
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  // proptypes
  static propTypes = {
    registerUser: func.isRequired,
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
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  // handlers
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    // remove error message for field with error
    // NOTE: uses ES7 Obj descructuring - may require babel: https://babeljs.io/docs/plugins/transform-object-rest-spread/
    if (this.state.errors[e.target.name]) {
      const { [e.target.name]: removedErr, ...errObj } = this.state.errors;
      this.setState({ errors: errObj });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;

    // this can be done client-side only if tool like ReCaptcha is used
    if (password !== password2) {
      return this.setState({
        errors: {
          password2: 'passwords do not match!'
        }
      });
    }

    const newUser = { name, email, password, password2 };

    // fire off action creator on submit
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <Container>
          <Row>
            <Col md="8" className="m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevLink account</p>
              <form onSubmit={this.onSubmit}>
                <FormInputGroup
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder="Full Name"
                  onChange={this.onChange}
                  required={true}
                  error={errors.name}
                />
                <FormInputGroup
                  type="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Email Address"
                  onChange={this.onChange}
                  required={true}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar
                  email"
                  error={errors.email}
                />
                <FormInputGroup
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.onChange}
                  required={true}
                  info="pasword must be at least 6 characters long"
                  error={errors.password}
                />
                <FormInputGroup
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  placeholder="Confirm Password"
                  onChange={this.onChange}
                  required={true}
                  error={errors.password2}
                />
                <Button color="info" block className="mt-4">
                  Sign Up
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
  { registerUser }
)(Register);
