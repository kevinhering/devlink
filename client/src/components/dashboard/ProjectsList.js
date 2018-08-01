import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// reactstrap
import { Button } from 'reactstrap';

// action creators
import { deleteProject } from '../../actions/profileActions';

// TODO: refactor to func component
// - check deleteProject handler implementation
export class ProjectsList extends Component {
  // proptypes
  static propTypes = {
    deleteProject: func.isRequired
  };

  // handlers
  onDeleteClick = id => {
    this.props.deleteProject(id);
  };

  render() {
    const projects = this.props.projects.map(proj => (
      <tr key={proj._id}>
        <td>{proj.title}</td>
        <td className="d-md-table-cell d-none">{proj.description}</td>
        <td className="d-sm-table-cell d-none">
          <a href={`http://${proj.repo}`} rel="noopener noreferrer" target="_blank">
            {proj.repo}
          </a>
        </td>
        <td className="d-flex justify-content-end">
          <Button
            tag={Link}
            to={`/edit-project/${proj._id}`}
            color="info"
            className="mr-2"
          >
            Edit
          </Button>
          <Button onClick={this.onDeleteClick.bind(this, proj._id)} color="danger">
            Delete
          </Button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Projects</h4>
        <table className="table">
          <thead>
            <tr className="d-sm-table-row d-none">
              <th>Title</th>
              <th className="d-md-table-cell d-none">Description</th>
              <th className="d-sm-table-cell d-none">Repository</th>
              <th />
            </tr>
          </thead>
          <tbody>{projects}</tbody>
        </table>
      </div>
    );
  }
}

// Redux connect() options
// mapDispatchToProps (declared inline below)

export default connect(
  null,
  { deleteProject }
)(ProjectsList);
