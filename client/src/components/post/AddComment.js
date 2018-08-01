import React, { Component } from 'react';
import { object, string, func } from 'prop-types';
import { connect } from 'react-redux';

// reactstrap
import { Card, CardBody, FormGroup, CardHeader, Button } from 'reactstrap';

// components
import TextAreaGroup from '../form/TextAreaGroup';

// action creators
import { clearErrors } from '../../actions/errorActions';
import { addComment } from '../../actions/postActions';

export class AddComment extends Component {
  // state
  state = {
    text: '',
    errors: {}
  };
  // proptypes
  static propTypes = {
    errors: object.isRequired,
    post: object.isRequired,
    postId: string.isRequired,
    addComment: func.isRequired,
    clearErrors: func.isRequired
  };

  // lifecycle methods
  componentDidMount() {
    this.props.clearErrors();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors !== this.props.errors) {
      this.setState({ errors: newProps.errors });
    }

    if (newProps.post !== this.props.post) {
      this.setState({ text: '', errors: {} });
    }
  }

  // handlers
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newComment = {
      text: this.state.text
    };

    const postId = this.props.postId;

    this.props.addComment(postId, newComment);
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="post-form mb-3">
        <Card>
          <CardHeader className="d-flex align-items-center">
            <h4 className="mt-1">Add a Comment</h4>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.onSubmit}>
              <FormGroup>
                <TextAreaGroup
                  name="text"
                  value={this.state.text}
                  placeholder="your comment"
                  onChange={this.onChange}
                  error={errors.text}
                  required={true}
                />
              </FormGroup>
              <Button type="submit" color="info" disabled={!this.state.text}>
                Comment
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

// Redux connect() options
// mapStateToProps
const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post
});

// mapDispatchToProps (declared inline below)

export default connect(
  mapStateToProps,
  { addComment, clearErrors }
)(AddComment);
