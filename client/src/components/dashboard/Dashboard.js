import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

// reactstrap
import { Container, Row, Col, Button } from 'reactstrap';

// components
import Spinner from '../transitions/Spinner';
import DashboardCommands from './DashboardCommands';
import ProjectsList from './ProjectsList';
import ResourcesList from './ResourcesList';

// action creators
import { getCurrentProfile } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';

export class Dashboard extends Component {
  // proptypes
  static propTypes = {
    auth: object.isRequired,
    profile: object.isRequired,
    getCurrentProfile: func.isRequired
  };

  // lifecycle methods
  componentDidMount() {
    this.props.clearErrors();
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { loading, profile } = this.props.profile;

    const createDashboardContent = profile => {
      if (loading || profile === null) {
        return <Spinner />;
      } else if (!isEmpty(profile)) {
        // profile retrieved
        return (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <DashboardCommands />
            {profile.projects.length > 0 && <ProjectsList projects={profile.projects} />}

            {profile.resources.length > 0 && (
              <ResourcesList resources={profile.resources} />
            )}
          </div>
        );
      } else {
        return (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>Please create a profile to get started</p>
            <Button tag={Link} to={'/create-profile'} color="info" size="lg">
              Create Profile
            </Button>
          </div>
        );
      }
    };

    return (
      <div className="dashboard">
        <Container>
          <Row>
            <Col md="12">
              <h1 className="display-4">Dashboard</h1>
              {createDashboardContent(profile)}
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
  profile: state.profile
});

// mapDispatchToProps (declared inline below)

export default connect(
  mapStateToProps,
  { getCurrentProfile, clearErrors }
)(Dashboard);
