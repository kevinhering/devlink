import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';

// reactstrap
import { Card, CardHeader, CardBody, FormGroup, Button } from 'reactstrap';

// components
import TextAreaGroup from '../form/TextAreaGroup';

// action creators
import { clearErrors } from '../../actions/errorActions';
import { addPost } from '../../actions/postActions';

export class AddPost extends Component {
  // state
  state = {
    text: '',
    errors: {}
  };

  // proptypes
  static propTypes = {
    errors: object.isRequired,
    post: object.isRequired,
    addPost: func.isRequired,
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
    // reset state if new post is received
    if (newProps.post !== this.props.post) {
      if (newProps.post.post) {
        this.setState({
          text: '',
          errors: {}
        });
      }
    }
  }

  // handlers
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      text: this.state.text
    };

    this.props.addPost(newPost);
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="post-form mb-3">
        <Card>
          <CardHeader className="d-flex align-items-center">
            <h4 className="mt-1">Post a Message</h4>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.onSubmit}>
              <FormGroup>
                <TextAreaGroup
                  name="text"
                  value={this.state.text}
                  placeholder="enter your message..."
                  onChange={this.onChange}
                  error={errors.text}
                  required={true}
                />
              </FormGroup>
              <Button color="info" type="submit" disabled={!this.state.text}>
                Post
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
  { addPost, clearErrors }
)(AddPost);
