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

const LOGIN = 'LOGIN';
export const login = user => {
  return { type: LOGIN, user };
};

const LOGOUT = 'LOGOUT';
export const logout = () => {
  return { type: LOGOUT };
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

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me');
    if (data) {
      dispatch(login(data));
    } else {
      dispatch(login({}));
    }
  } catch (err) {
    console.log(err);
  }
};

// Reducer
const initialState = { comments: [], user: {} };

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
    case LOGIN:
      return {
        ...state,
        user: action.user,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunkMiddleware));
