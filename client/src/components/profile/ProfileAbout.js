import React from 'react';

// utils
import isEmpty from 'lodash/isEmpty';

// reactstrap
import { Row, Col, Card, CardBody } from 'reactstrap';

const ProfileAbout = props => {
  const { profile } = props;

  const renderSkills = skillArr => {
    return skillArr.map((skill, i) => (
      <div key={i} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));
  };

  return (
    <Row>
      <Col lg="10" className="m-auto">
        <Card color="light" className="mb-3">
          <CardBody>
            {!isEmpty(profile.bio) && (
              <div>
                <h3 className="text-center text-info">Bio</h3>
                <p className="lead text-center">{profile.bio}</p>
                <hr />
              </div>
            )}
            <div>
              <h3 className="text-center text-info">Skill Set</h3>

              <div className="d-flex flex-wrap justify-content-center align-items-center m-auto">
                {renderSkills(profile.skills)}
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileAbout;
