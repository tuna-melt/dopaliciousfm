import '../styles/login.scss';

import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import Marquee from './Marquee';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Login = (props) => {
  useEffect(() => {
    document.title = 'Dopaliscious';
  }, []);

  const [bounce, setBounce] = useState(false);

  const url = props.history.location.pathname;

  let component;
  if (url === '/signup') {
    component = <SignupForm history={props.history} />;
  } else if (url === '/login') {
    component = <LoginForm history={props.history} />;
  } else {
    component = (
      <React.Fragment>
        <div className="buttons">
          <h1>DOPALISCIOUS</h1>
          <a href="/auth/spotify">
            <button type="button">Login With Spotify</button>
          </a>
          <a onClick={() => props.history.push('/login')}>
            <button type="button">Continue without audio</button>
          </a>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div id="login">
      <div
        className="container left"
        onKeyDown={() => setBounce(true)}
        onKeyUp={() => setBounce(false)}
        onMouseDown={() => setBounce(true)}
        onMouseUp={() => setBounce(false)}
      >
        {/* {(url === '/login' || url === '/signup') && <Marquee bounce={bounce} />} */}
        {component}
      </div>
      <img src="login.jpg" className="background" />
    </div>
  );
};

export default withRouter(Login);
