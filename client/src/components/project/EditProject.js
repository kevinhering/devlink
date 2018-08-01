import React, { Component } from 'react';
import { object, func } from 'prop-types';
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
import { getCurrentProfile, editProject } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';

export class EditProject extends Component {
  // state
  state = {
    id: this.props.match.params.id,
    title: '',
    description: '',
    repo: '',
    url: '',
    from: '',
    to: '',
    current: true,
    keywords: '',
    errors: {},
    disabled: true
  };

  // proptypes
  static propTypes = {
    profile: object.isRequired,
    errors: object.isRequired,
    getCurrentProfile: func.isRequired,
    editProject: func.isRequired,
    clearErrors: func.isRequired
  };

  // lifecycle methods
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.clearErrors();
  }

  // TODO: this will have to be refactored at some point - deprecated method
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (
      nextProps.profile.profile &&
      nextProps.profile.profile !== this.props.profile.profile
    ) {
      const nextProject = nextProps.profile.profile.projects
        ? nextProps.profile.profile.projects.find(
            project => project._id === this.props.match.params.id
          )
        : '';

      if (nextProject) {
        const {
          from: fromPre,
          to: toPre,
          keywords: keywordsArr,
          current,
          ...proj
        } = nextProject;
        const keywords = keywordsArr ? keywordsArr.join(', ') : '';
        const from = fromPre.slice(0, 10);
        const to = !current ? toPre.slice(0, 10) : '';

        this.setState(prevState => ({
          ...prevState,
          ...proj,
          from,
          to,
          current,
          keywords
        }));
      }
    }
  }

  // handlers
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      to: '',
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const projectData = pick(this.state, [
      'title',
      'description',
      'repo',
      'url',
      'from',
      'to',
      'current',
      'keywords'
    ]);

    this.props.editProject(projectData, this.state.id, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="add-resource">
        <Container>
          <Row>
            <Col md="10" className="m-auto">
              <Button tag={Link} to={'/dashboard'} color="danger" className="mb-4">
                Back to Dashboard
              </Button>
              <h1 className="display-4 text-center">Edit Project</h1>

              <small className="d-block pb-3">* required</small>
              <form onSubmit={this.onSubmit}>
                <FormInputGroup
                  label="Title"
                  id="title"
                  name="title"
                  value={this.state.title}
                  placeholder="* Title"
                  info="The title or name of the project"
                  onChange={this.onChange}
                  error={errors.title}
                  required={true}
                />
                <TextAreaGroup
                  label="Description"
                  id="description"
                  name="description"
                  value={this.state.description}
                  placeholder="* Description"
                  info="A brief description of the project"
                  onChange={this.onChange}
                  error={errors.description}
                  required={true}
                />
                <FormInputGroup
                  label="Repository"
                  id="repo"
                  type="text"
                  name="repo"
                  value={this.state.repo}
                  placeholder="* Repo"
                  info="The URL of the repository for the project"
                  onChange={this.onChange}
                  error={errors.repo}
                  required={true}
                />
                <FormInputGroup
                  label="Website"
                  id="url"
                  type="text"
                  name="url"
                  value={this.state.url}
                  placeholder="URL"
                  info="A url for the project or documentation"
                  onChange={this.onChange}
                  error={errors.url}
                />
                <FormInputGroup
                  label="Project Start Date"
                  id="projectStart"
                  type="date"
                  name="from"
                  value={this.state.from}
                  info="The date the project was started"
                  onChange={this.onChange}
                  error={errors.from}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Project is still active
                  </label>
                </div>
                {!this.state.current && (
                  <FormInputGroup
                    label="Project End Date"
                    id="projectEnd"
                    type="date"
                    name="to"
                    value={this.state.to}
                    info="The date the project was completed"
                    onChange={this.onChange}
                    error={errors.to}
                    disabled={this.state.disabled}
                  />
                )}
                <FormInputGroup
                  label="Keywords"
                  id="keywords"
                  type="text"
                  name="keywords"
                  value={this.state.keywords}
                  placeholder="keywords"
                  info="Keywords that may help people find your project (separate each word with a comma: react, state management, ...)"
                  onChange={this.onChange}
                  error={errors.keywords}
                />
                <Button
                  type="submit"
                  value="Submit"
                  color="info"
                  className="btn-block mt-4"
                >
                  Submit Changes
                </Button>
                {!isEmpty(errors) && (
                  <div className="text-danger mt-3">
                    An error has occurred, please check your entries.
                  </div>
                )}
                {errors.project && (
                  <div className="text-danger mt-3">
                    <p>This project was not found in your profile.</p>
                    <p>
                      Go back to the <Link to="/dashboard">Dashboard</Link> to verify.
                    </p>
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
  { getCurrentProfile, editProject, clearErrors }
)(EditProject);
