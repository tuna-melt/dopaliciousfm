import React from 'react';

const Comment = props => {
  const { comment } = props;
  const { user } = comment;
  return (
    <li className="comment">
      <img className="icon" src={user.imageURL} />
      <p>
        <span className="name">{user.name}</span> {comment.content}
      </p>
    </li>
  );
};

export default Comment;
