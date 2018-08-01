import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// utils
import isEmpty from 'lodash/isEmpty';

// reactstrap
import { Container, Row, Col, Button } from 'reactstrap';

// components
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProjectList from '../project/ProjectList';
import ResourceList from '../resource/ResourceList';
import Spinner from '../transitions/Spinner';

// action creators
import { getProfileByHandle } from '../../actions/profileActions';

export class Profile extends Component {
  // proptypes
  static propTypes = {
    profile: object.isRequired,
    getProfileByHandle: func.isRequired
  };

  // lifecycle methods
  componentDidMount = () => {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  };

  render() {
    const { profile, loading } = this.props.profile;

    const createProfileContent = profile => {
      if (loading || profile === null) {
        return <Spinner />;
      } else if (!isEmpty(profile)) {
        // profile retrieved
        return (
          <div>
            <Row>
              <Col lg={{ size: 6, offset: 1 }}>
                <Button
                  tag={Link}
                  to={'/profiles'}
                  color="light"
                  className="mb-3 float-left"
                >
                  View Profiles
                </Button>
              </Col>
            </Row>
            <ProfileHeader profile={profile} />
            <ProfileAbout profile={profile} />
            {profile.projects &&
              profile.projects.length > 0 && <ProjectList projects={profile.projects} />}
            {profile.resources &&
              profile.resources.length > 0 && (
                <ResourceList resources={profile.resources} />
              )}
          </div>
        );
      } else {
        return (
          <div>
            <p className="lead text-muted">Profile Not Found</p>
            <p>The profile you requested was not found</p>
            <Button tag={Link} to="/profiles" color="info">
              View Profiles
            </Button>
          </div>
        );
      }
    };

    return (
      <div className="profile">
        <Container>
          <Row>
            <Col md="12">{createProfileContent(profile)}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// Redux connect() options
// mapStateToProps
const mapStateToProps = state => ({
  profile: state.profile
});

// mapDispatchToProps (declared inline below)

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
