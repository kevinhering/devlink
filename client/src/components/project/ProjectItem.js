import React from 'react';
import { object } from 'prop-types';
import Moment from 'react-moment';

// reactstrap
import { Card, CardHeader, CardBody, CardText, Button } from 'reactstrap';

export const ProjectItem = props => {
  const { project } = props;

  return (
    <Card className="mt-3">
      <CardHeader tag="h4">{project.title}</CardHeader>
      <CardBody>
        {project.from && (
          <p className="card-text">
            <Moment format="MMMM, YYYY">{project.from}</Moment> -{' '}
            {project.current ? (
              <em>current</em>
            ) : (
              <Moment format="MMMM, YYYY">{project.to}</Moment>
            )}
          </p>
        )}

        <CardText>
          <strong>Description: &nbsp;</strong>
          {project.description}
        </CardText>

        <CardText>
          <strong>Keywords: &nbsp;</strong>
          {project.keywords ? <span>{project.keywords.join(', ')}</span> : null}
        </CardText>

        <CardText>
          <Button
            color="info"
            className="mr-2"
            href={`https://${project.repo}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to Project Repo
          </Button>
          {project.url && (
            <Button
              color="info"
              href={`https://${project.url}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Go to Website
            </Button>
          )}
        </CardText>
      </CardBody>
    </Card>
  );
};

// proptypes
ProjectItem.propTypes = {
  project: object
};

export default ProjectItem;
