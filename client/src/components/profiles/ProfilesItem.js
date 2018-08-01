import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Row, Col, Card, CardBody, ListGroup, ListGroupItem, Button } from 'reactstrap';

// utils
import isEmpty from 'lodash/isEmpty';

export const ProfilesItem = props => {
  const { profile } = props;
  return (
    <Card color="light" className="mb-3">
      <CardBody>
        <Row>
          <Col xs="3" md="2">
            <img src={profile.user.avatar} alt="profile" className="rounded-circle" />
          </Col>
          <Col xs="9" md="4">
            <h3>{profile.user.name}</h3>
            <p>{profile.focus}</p>
            <p>{!isEmpty(profile.location) && <span>{profile.location}</span>}</p>
            <Button tag={Link} to={`/profile/${profile.handle}`} color="info">
              View Profile
            </Button>
          </Col>
          <Col md="6" className="d-none d-md-block">
            <h4>Skills</h4>
            <ListGroup>
              {profile.skills
                .slice(0, 4)
                .map((skill, index) => (
                  <ListGroupItem key={index}>{skill}</ListGroupItem>
                ))}
            </ListGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ProfilesItem.proptypes = {
  profile: PropTypes.object.isRequired
};

export default ProfilesItem;
