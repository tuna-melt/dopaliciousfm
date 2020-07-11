import '../styles/login.scss';

import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Marquee from './Marquee';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Login = props => {
  useEffect(() => {
    document.title = 'Dopaliscious';
  }, []);

  const url = props.history.location.pathname;

  let component;
  if (url === '/signup') {
    component = <SignupForm history={props.history} />;
  } else if (url === '/login') {
    component = <LoginForm history={props.history} />;
  } else {
    component = (
      <React.Fragment>
        <div className="form-container">
          <a href="/auth/spotify">
            <button type="button">Login With Spotify</button>
          </a>
          <a href="/login">
            <button type="button">Continue without audio</button>
          </a>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div id="login">
      <div className="container">
        <Marquee />
        {component}
      </div>
      <div
        className="container"
        style={{ background: `url('dope-pink.jpg')` }}
      />
    </div>
  );
};

export default withRouter(Login);
