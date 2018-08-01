import React from 'react';
import { array } from 'prop-types';

//reactstrap
import { Row, Col } from 'reactstrap';

// components
import ResourceItem from './ResourceItem';

export const ResourceList = props => {
  const { resources } = props;

  return (
    <div>
      <Row>
        <Col lg="10" className="m-auto">
          <h3 className="text-center text-info mt-4">Resources</h3>
          {resources.map(resource => (
            <ResourceItem key={resource._id} resource={resource} />
          ))}
        </Col>
      </Row>
    </div>
  );
};

// proptypes
ResourceItem.propTypes = {
  resources: array
};

export default ResourceList;
