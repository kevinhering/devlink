import React, { Component } from 'react';
import { object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// reactstrap
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

// action creators
import { deletePost, likePost, unlikePost } from '../../actions/postActions';

// TODO: convert to functional comp
// - pull out message actions into new comp
export class PostItem extends Component {
  // proptypes
  static propTypes = {
    auth: object.isRequired,
    post: object.isRequired,
    showLikes: bool,
    showActions: bool,
    deletePost: func.isRequired,
    likePost: func.isRequired,
    unlikePost: func.isRequired
  };

  static defaultProps = {
    showActions: true,
    showLikes: true
  };

  // handlers
  onDeleteClick = id => {
    this.props.deletePost(id);
  };

  onLikeClick = id => {
    // toggle like/unlike
    this.props.post.likes.some(like => like.user === this.props.auth.user.id)
      ? this.props.unlikePost(id)
      : this.props.likePost(id);
  };

  render() {
    const {
      _id: postId,
      user: postUserId,
      name,
      avatar,
      text,
      likes,
      comments
    } = this.props.post;

    const { id: userId } = this.props.auth.user;

    const { showActions, showLikes } = this.props;

    return (
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col md="2">
              <img className="rounded-circle d-md-block d-none" src={avatar} alt="" />
              <p className="text-md-center text-secondary">{name}</p>
            </Col>
            <Col md="10" className="d-flex flex-column">
              <p className="lead flex-grow-1">{text}</p>
              <div className="d-flex">
                {showLikes && (
                  <Button
                    onClick={() => this.onLikeClick(postId)}
                    type="button"
                    color="light"
                    className="mr-1"
                  >
                    <i
                      className={
                        likes.some(like => like.user === userId)
                          ? 'text-info fas fa-thumbs-up'
                          : 'text-secondary fas fa-thumbs-up'
                      }
                    />
                    <span className="badge badge-light">{likes.length}</span>
                  </Button>
                )}
                {showActions && (
                  <div className="post-actions">
                    <Button
                      tag={Link}
                      to={`/post/${postId}`}
                      color="info"
                      className="mr-1"
                    >
                      {`Comments (${comments.length})`}
                    </Button>
                    {postUserId === userId && (
                      <Button
                        onClick={() => this.onDeleteClick(postId)}
                        type="button"
                        color="danger"
                        className="mr-1"
                      >
                        <i className="fas fa-times" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

// redux connect methods
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likePost, unlikePost }
)(PostItem);
