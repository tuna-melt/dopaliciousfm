import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login';
import Play from './components/Play';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const Routes = props => {
  const { isLoggedIn } = props;

  return (
    <Switch>
      {isLoggedIn && <Route path="/" component={Play} />}
      {!isLoggedIn && <Route path="/login" component={LoginForm} />}
      {!isLoggedIn && <Route path="/signup" component={SignupForm} />}
      {!isLoggedIn && <Route path="/" component={Login} />}
    </Switch>
  );
};

const mapState = state => {
  return { isLoggedIn: !!state.user._id };
};

export default connect(mapState, null)(Routes);
