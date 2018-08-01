import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// utilities
import isEmpty from 'lodash/isEmpty';

// reactstrap
import { Container, Row, Col, Button } from 'reactstrap';

// components
import PostItem from '../posts/PostItem';
import AddComment from './AddComment';
import CommentFeed from './CommentFeed';
import Spinner from '../transitions/Spinner';

// action creators
import { getPost } from '../../actions/postActions';

export class Post extends Component {
  // proptypes
  static propTypes = {
    errors: object.isRequired,
    post: object.isRequired,
    getPost: func.isRequired
  };

  // lifecycle methods
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, isLoading } = this.props.post;
    const { comments, _id: postId } = this.props.post.post;

    const renderPost = (post, isLoading) => {
      if (isLoading) {
        return <Spinner />;
      } else if (!isEmpty(post)) {
        return (
          <div>
            <PostItem post={post} showActions={false} showLike={true} />
            <AddComment postId={postId} />
            <CommentFeed comments={comments} postId={post._id} />
          </div>
        );
      }
    };

    return (
      <div className="post">
        <Container>
          <Row>
            <Col md="12">
              <Button tag={Link} to={'/postfeed'} color="light" className="mb-3">
                Back to Message Feed
              </Button>
              {renderPost(post, isLoading)}
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
  errors: state.errors,
  post: state.post
});

// mapDispatchToProps (declared inline below)

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
