import axios from 'axios';
import socket from '../socket';

const GOT_COMMENTS_FROM_SERVER = 'GOT_COMMENTS_FROM_SERVER';
const gotComments = comments => {
  return { type: GOT_COMMENTS_FROM_SERVER, comments };
};

const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = comment => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

// Thunks
export const getComments = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/comments');
      const messages = response.data;
      dispatch(gotComments(messages));
    } catch (err) {
      console.log(err);
    }
  };
};

export const postComment = comment => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/comments', {
        content: comment,
      });
      const newComment = response.data;
      dispatch(addComment(newComment));
      socket.emit('new-message', newComment);
    } catch (err) {
      console.log(err);
    }
  };
};

export default (comments = [], action) => {
  switch (action.type) {
    case GOT_COMMENTS_FROM_SERVER:
      return action.comments;

    case ADD_COMMENT:
      return [...comments, action.comment];

    default:
      return comments;
  }
};
