import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// reactstrap
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

// action creators
import { logoutUser } from '../../actions/authActions';
import { clearProfile } from '../../actions/profileActions';

class AppNavbar extends Component {
  // state
  state = {
    isOpen: false
  };

  // proptypes
  static propTypes = {
    logoutUser: func.isRequired,
    auth: object.isRequired
  };

  // handlers
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearProfile();
    this.props.logoutUser();
  };

  toggleNavbar = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // alternate nav links based on authentication
    const authLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/profiles" activeClassName={'active'}>
            Developers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to={'/postfeed'} activeClassName={'active'}>
            Message Feed
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to={'/dashboard'} activeClassName={'active'}>
            My Dashboard
            <img
              src={user.avatar}
              className="rounded-circle ml-2"
              style={{ width: '25px' }}
              alt={user.name}
            />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} onClick={this.onLogoutClick} to="/login">
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );

    const unauthLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/profiles" activeClassName={'active'}>
            Developers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to={'/register'} activeClassName={'active'}>
            Sign Up
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to={'/login'} activeClassName={'active'}>
            Login
          </NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <div>
        <Navbar expand="md" color="dark" dark className="mb-4">
          <Container>
            <NavbarBrand tag={Link} to={'/'}>
              DevLink
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />

            <Collapse isOpen={this.state.isOpen} navbar>
              {isAuthenticated ? authLinks : unauthLinks}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

// Redux connect() options
// mapStateToProps
const mapStateToProps = state => ({
  auth: state.auth
});

// mapDispatchToProps (declared inline below)

export default connect(
  mapStateToProps,
  { logoutUser, clearProfile }
)(AppNavbar);
