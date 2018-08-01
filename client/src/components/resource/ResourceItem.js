import React from 'react';
import { object } from 'prop-types';
import Moment from 'react-moment';

// reactstrap
import { Card, CardHeader, CardBody, CardText, Button } from 'reactstrap';

export const ResourceItem = props => {
  const { resource } = props;

  return (
    <Card className="mt-3">
      <CardHeader tag="h4">{resource.name}</CardHeader>
      <CardBody>
        {resource.topic && (
          <p className="card-text">
            <strong>Topic: &nbsp;</strong>
            {resource.topic}
          </p>
        )}

        <CardText>
          <strong>Description: &nbsp;</strong>
          {resource.description}
        </CardText>

        {resource.date && (
          <CardText>
            <strong>Date: &nbsp;</strong>
            <Moment format="MMMM, YYYY">{resource.date}</Moment>
          </CardText>
        )}

        <CardText>
          <strong>Keywords: &nbsp;</strong>
          {resource.keywords && <span>{resource.keywords.join(', ')}</span>}
        </CardText>

        <CardText>
          {resource.url && (
            <Button
              color="info"
              href={`https://${resource.url}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Go to Resource
            </Button>
          )}
        </CardText>
      </CardBody>
    </Card>
  );
};

// proptypes
ResourceItem.propTypes = {
  resource: object
};

export default ResourceItem;
