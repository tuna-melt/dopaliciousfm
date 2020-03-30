import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

// Actions
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

export const postComment = (comment, user) => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/comment', {
        content: comment,
        user: user.id,
      });
      const newComment = response.data;
      dispatch(addComment(newComment));
      socket.emit('new-message', newComment);
    } catch (err) {
      console.log(err);
    }
  };
};

// Reducer
const initialState = { comments: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_COMMENTS_FROM_SERVER:
      return {
        ...state,
        comments: action.comments,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunkMiddleware));
