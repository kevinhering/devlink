import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// utils
import isEmpty from 'lodash/isEmpty';

// reactstrap
import { Row, Container, Col, Button } from 'reactstrap';

// components
import ProfilesItem from './ProfilesItem.alt';
import Spinner from '../transitions/Spinner';

// action creators
import { getProfiles } from '../../actions/profileActions';

export class Profiles extends Component {
  // proptypes
  static propTypes = {
    profile: object.isRequired,
    getProfiles: func.isRequired
  };

  // lifecycle methods
  componentDidMount = () => {
    this.props.getProfiles();
  };

  render() {
    const { profiles, loading } = this.props.profile;

    const createProfilesContent = profiles => {
      if (loading || profiles === null) {
        return <Spinner />;
      } else if (!isEmpty(Profiles)) {
        return (
          <div>
            {profiles.map(profile => (
              <ProfilesItem profile={profile} key={profile._id} />
            ))}
          </div>
        );
      } else {
        return (
          <div>
            <h4>No Profiles</h4>
            <p>Please create a profile to get started</p>
            <Button tag={Link} to={'/create-profile'} color="info" size="lg">
              Create Profile
            </Button>
          </div>
        );
      }
    };

    return (
      <div className="profiles">
        <Container>
          <Row>
            <Col md="12">
              <h1 className="display-4 text-center">Developers</h1>
              <p className="lead text-center">The Developers on your team</p>
              {createProfilesContent(profiles)}
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
  profile: state.profile
});

// mapDispatchToProps (declared inline below)

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
