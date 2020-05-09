import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login';
import Play from './components/Play';

const Routes = props => {
  const { isLoggedIn } = props;

  return (
    <Switch>
      {isLoggedIn && <Route path="/" component={Play} />}
      {!isLoggedIn && <Route path="/" component={Login} />}
    </Switch>
  );
};

const mapState = state => {
  return { isLoggedIn: !!state.user._id };
};

export default connect(mapState, null)(Routes);
