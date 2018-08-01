import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';

// reactstrap
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

// action creators
import { deleteComment } from '../../actions/postActions';

// TODO: refactor to functional component...
export class CommentItem extends Component {
  //handlers
  onDeleteClick = (PostId, commentId) => {
    this.props.deleteComment(PostId, commentId);
  };

  // proptypes
  static propTypes = {
    auth: object.isRequired,
    comment: object.isRequired,
    deleteComment: func.isRequired
  };

  render() {
    const {
      _id: commentId,
      user: commentUserId,
      text,
      name,
      avatar
    } = this.props.comment;

    const { id: userId } = this.props.auth.user;

    const { postId } = this.props;

    return (
      <Card className="mb-3 ml-5">
        <CardBody>
          <Row>
            <Col md="2">
              <img className="rounded-circle d-md-block d-none" src={avatar} alt="" />
              <p className="text-md-center text-secondary">{name}</p>
            </Col>
            <Col md="10" className="d-flex flex-column">
              <p className="lead flex-grow-1">{text}</p>

              <div className="post-actions d-flex">
                {commentUserId === userId && (
                  <Button
                    onClick={() => this.onDeleteClick(postId, commentId)}
                    color="danger"
                    className="mr-1"
                  >
                    <i className="fas fa-times" />
                  </Button>
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
  { deleteComment }
)(CommentItem);
