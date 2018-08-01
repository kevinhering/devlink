import React from 'react';

// utils
import isEmpty from 'lodash/isEmpty';

// reactstrap
import { Row, Col, Card, CardBody } from 'reactstrap';

// TODO: part out link icons (Social Links) as separate component
const ProfileHeader = props => {
  const { profile } = props;

  const renderSocialLinks = socObj => {
    return Object.keys(socObj).map(key => {
      if (socObj[key]) {
        return (
          socObj[key] && (
            <a
              key={key}
              className="text-white p-2"
              href={`https://${socObj[key]}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className={`fab fa-${key} fa-2x`} />
            </a>
          )
        );
      } else return null;
    });
  };

  return (
    <Row>
      <Col lg="10" className="m-auto">
        <Card color="info" className="text-white mb-3">
          <CardBody>
            <Row>
              <Col xs="4" md="3" className="m-auto">
                <img className="rounded-circle mb-3" src={profile.user.avatar} alt="" />
              </Col>
            </Row>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.focus}{' '}
                {!isEmpty(profile.employer) ? <span>at {profile.employer}</span> : ''}
              </p>
              {!isEmpty(profile.location) ? <p>{profile.location}</p> : ''}
              <p>
                {!isEmpty(profile.website) && (
                  <a
                    className="text-white p-2"
                    href={`https://${profile.website}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}
                {renderSocialLinks(profile.social)}
              </p>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileHeader;
