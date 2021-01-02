import axios from 'axios';

const SET_USER = 'SET_USER';
const setUser = user => {
  return { type: SET_USER, user };
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(setUser({}));
  } catch (err) {
    console.log(err);
  }
};

export const login = user => async dispatch => {
  try {
    const { data } = await axios.post('/auth/login', user);
    if (data && data._id) {
      dispatch(setUser(data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const signup = user => async dispatch => {
  try {
    const { data } = await axios.post('/auth/signup', user);
    if (data && data._id) {
      dispatch(setUser(data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me');
    if (data) {
      if (data.tokenExpiration) {
        setTimeout(() => {
          dispatch(me());
        }, data.tokenExpiration - Date.now() + 5000);
      }
      dispatch(setUser(data));
    } else {
      dispatch(setUser({}));
    }
  } catch (err) {
    console.log(err);
  }
};

// reducer
export default (user = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;

    default:
      return user;
  }
};
