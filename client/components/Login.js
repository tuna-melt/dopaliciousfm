import React from 'react';
import { withRouter } from 'react-router-dom';

const Login = props => {
  return (
    <div id="login">
      <h1>DOPE.FM</h1>
      <a href="/auth/spotify">
        <button type="button">Login With Spotify</button>
      </a>
      <a href="/auth/applemusic">
        <button type="button">Login With Apple Music</button>
      </a>
    </div>
  );
};

export default withRouter(Login);
