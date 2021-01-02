import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import user from './user';
import player from './player';
import comments from './comments';

const rootReducer = (state = {}, action) => {
  return {
    user: user(state.user, action),
    player: player(state.player, action, state),
    comments: comments(state.comments, action),
  };
};

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
export * from './user';
export * from './player';
export * from './comments';
