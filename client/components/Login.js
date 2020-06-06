import React from 'react';
import { withRouter } from 'react-router-dom';

const Login = () => {
  return (
    <div id="login">
      <h1>DOPALISCIOUS</h1>
      <a href="/auth/spotify">
        <button type="button">Login With Spotify</button>
      </a>
      <a href="/login">
        <button type="button">Continue without audio</button>
      </a>
    </div>
  );
};

export default withRouter(Login);
