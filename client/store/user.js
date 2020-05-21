import axios from 'axios';

const LOGIN = 'LOGIN';
export const login = user => {
  return { type: LOGIN, user };
};

const LOGOUT = 'LOGOUT';
export const logout = () => {
  return { type: LOGOUT };
};

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me');
    if (data) {
      if (data._id) {
        setTimeout(() => {
          dispatch(me());
        }, data.tokenExpiration - Date.now() + 5000);
      }
      dispatch(login(data));
    } else {
      dispatch(login({}));
    }
  } catch (err) {
    console.log(err);
  }
};

// reducer
export default (user = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;

    case LOGOUT:
      return {};

    default:
      return user;
  }
};
