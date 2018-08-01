import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// reactstrap
import { Button } from 'reactstrap';

// action creators
import { deleteResource } from '../../actions/profileActions';

// TODO: refactor to functional comp
export class ResourcesList extends Component {
  // proptypes
  static propTypes = {
    deleteResource: func.isRequired
  };

  // handlers
  onDeleteClick = id => {
    this.props.deleteResource(id);
  };

  render() {
    const resources = this.props.resources.map(resource => (
      <tr key={resource._id}>
        <td>{resource.name}</td>
        <td className="d-md-table-cell d-none">{resource.description}</td>
        <td className="d-sm-table-cell d-none">
          <a href={`http://${resource.url}`} rel="noopener noreferrer" target="_blank">
            {resource.url}
          </a>
        </td>
        <td className="d-flex justify-content-end">
          <Button
            tag={Link}
            to={`/edit-resource/${resource._id}`}
            color="info"
            className="mr-2"
          >
            Edit
          </Button>
          <button
            onClick={this.onDeleteClick.bind(this, resource._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Resources</h4>
        <table className="table">
          <thead>
            <tr className="d-sm-table-row d-none">
              <th>Name</th>
              <th className="d-md-table-cell d-none">Description</th>
              <th className="d-sm-table-cell d-none">URL</th>
              <th />
            </tr>
          </thead>
          <tbody>{resources}</tbody>
        </table>
      </div>
    );
  }
}

// Redux connect() options
// mapDispatchToProps (declared inline below)

export default connect(
  null,
  { deleteResource }
)(ResourcesList);
