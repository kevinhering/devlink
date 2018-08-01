import React from 'react';
import { array } from 'prop-types';

//reactstrap
import { Row, Col } from 'reactstrap';

// components
import ProjectItem from './ProjectItem';

export const ProjectList = props => {
  const { projects } = props;

  return (
    <div>
      <Row>
        <Col lg="10" className="m-auto">
          <h3 className="text-center text-info my-2">Projects</h3>
          {projects.map(project => <ProjectItem key={project._id} project={project} />)}
        </Col>
      </Row>
    </div>
  );
};

// proptypes
ProjectItem.propTypes = {
  projects: array
};

export default ProjectList;
