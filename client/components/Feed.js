import React from 'react';
import Comment from './Comment';

const Feed = props => {
  const { comments } = props;
  return (
    <ul>
      {comments.map(comment => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </ul>
  );
};

export default Feed;
