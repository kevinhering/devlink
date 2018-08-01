import React, { Component } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// utilities
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';

// reactstrap
import { Container, Row, Col, Button } from 'reactstrap';

// components
import TextAreaGroup from '../form/TextAreaGroup';
import FormInputGroup from '../form/FormInputGroup';

// action creators
import { addResource } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';

export class AddResource extends Component {
  // state
  state = {
    name: '',
    topic: '',
    description: '',
    url: '',
    date: '',
    keywords: '',
    errors: {}
  };

  // proptypes
  static propTypes = {
    profile: object.isRequired,
    errors: object.isRequired
  };

  // lifecycle methods
  componentDidMount = () => {
    this.props.clearErrors();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  // handlers
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const resourceData = pick(this.state, [
      'name',
      'topic',
      'description',
      'url',
      'date',
      'keywords'
    ]);

    this.props.addResource(resourceData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="add-project">
        <Container>
          <Row>
            <Col md="10" className="m-auto">
              <Button tag={Link} to={'/dashboard'} color="danger" className="mb-4">
                Back to Dashboard
              </Button>
              <h1 className="display-4 text-center">Add a Resource</h1>
              <p className="lead text-center">
                Add a resource, such as an article, document, presentation, video, that
                you've created or found helpful
              </p>
              <small className="d-block pb-3">* required</small>
              <form onSubmit={this.onSubmit}>
                <FormInputGroup
                  label="Resource Name"
                  id="name"
                  name="name"
                  value={this.state.name}
                  placeholder="* Name"
                  info="A name for your resource"
                  onChange={this.onChange}
                  error={errors.name}
                  required={true}
                />
                <FormInputGroup
                  label="Topic"
                  id="topic"
                  name="topic"
                  value={this.state.topic}
                  placeholder="Topic"
                  info="The main topic of your resource"
                  onChange={this.onChange}
                  error={errors.topic}
                />
                <TextAreaGroup
                  label="Description"
                  id="description"
                  name="description"
                  value={this.state.description}
                  placeholder="* Description"
                  info="A brief description of the resource"
                  onChange={this.onChange}
                  error={errors.description}
                />
                <FormInputGroup
                  label="Resource URL"
                  id="name"
                  name="url"
                  value={this.state.url}
                  placeholder="* URL"
                  info="A url for your resource"
                  onChange={this.onChange}
                  error={errors.url}
                  required={true}
                />
                <FormInputGroup
                  label="Resource Date"
                  id="date"
                  type="date"
                  name="date"
                  value={this.state.date}
                  info="The date the resource was created (or last updated)"
                  onChange={this.onChange}
                  error={errors.date}
                />
                <FormInputGroup
                  label="Resource Keywords"
                  id="keywords"
                  name="keywords"
                  value={this.state.keywords}
                  placeholder="keywords"
                  info="Keywords that may help people find this resource (separate each word with a comma: react, state management, ...)"
                  onChange={this.onChange}
                  error={errors.keywords}
                />
                <Button
                  type="submit"
                  value="Submit"
                  color="info"
                  className="btn-block mt-4"
                >
                  Add Resource
                </Button>
                {!isEmpty(errors) && (
                  <div className="text-danger mt-3">
                    An error has occurred, please check your entries.
                  </div>
                )}
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// Redux connect() options
// mapStateToProps
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

//mapDispatchToProps (listed inline below)

export default connect(
  mapStateToProps,
  { addResource, clearErrors }
)(AddResource);
