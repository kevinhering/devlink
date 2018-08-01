import React, { Component } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';

// reactstrap
import { Container, Row, Col } from 'reactstrap';

// components
import Spinner from '../transitions/Spinner';
import AddPost from './AddPost';
import PostFeed from './PostFeed';

// action creators
import { clearErrors } from '../../actions/errorActions';
import { getPosts } from '../../actions/postActions';

export class Posts extends Component {
  // state
  state = {
    posts: null
  };

  // proptypes
  static propTypes = {
    post: object.isRequired
  };

  //lifecycle methods
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, isLoading } = this.props.post;

    const renderPosts = (posts, isLoading) => {
      if (isLoading) {
        return <Spinner />;
      } else if (posts.length > 0) {
        return <PostFeed posts={posts} />;
      } else {
        return '(no posts)';
      }
    };

    return (
      <div className="postsList">
        <Container>
          <Row>
            <Col md="12">
              <AddPost />
              {renderPosts(posts, isLoading)}
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
  post: state.post
});

// mapDispatchToProps (inline below)

export default connect(
  mapStateToProps,
  { getPosts, clearErrors }
)(Posts);
