import React, { useRef, useEffect } from 'react';
import Comment from './Comment';

const Feed = props => {
  const { comments } = props;

  let messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  useEffect(() => {
    setTimeout(() => {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }, [props.isVisible]);

  return (
    <ul id="feed">
      {comments.map(comment => {
        return <Comment key={comment._id} comment={comment} />;
      })}
      <li style={{ float: 'left', clear: 'both' }} ref={messagesEnd} />
    </ul>
  );
};

export default Feed;
