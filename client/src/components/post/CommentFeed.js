import React from 'react';
import { array, string } from 'prop-types';

// components
import CommentItem from './CommentItem';

const CommentFeed = props => {
  const { comments, postId } = props;
  return comments.map(comment => (
    <CommentItem key={comment._id} postId={postId} comment={comment} />
  ));
};

// proptypes
CommentFeed.propTypes = {
  comments: array.isRequired,
  postId: string.isRequired
};

export default CommentFeed;
