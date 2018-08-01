import React from 'react';
import { Link } from 'react-router-dom';

// reactstrap
import { ButtonGroup, Button } from 'reactstrap';

function DashboardCommands(props) {
  return (
    <ButtonGroup className="mb-4" role="group">
      <Button tag={Link} to={'/edit-profile'} color="light">
        <i className="fas fa-user-circle text-info mr-2" />
        Edit Profile
      </Button>
      <Button tag={Link} to={'/add-project'} color="light">
        <i className="fas fa-code text-info mr-2" />
        Add Project
      </Button>
      <Button tag={Link} to={'/add-resource'} color="light">
        <i className="fas fa-file-code text-info mr-2" />
        Add Resource
      </Button>
    </ButtonGroup>
  );
}

export default DashboardCommands;
