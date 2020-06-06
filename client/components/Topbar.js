import '../styles/topbar.scss';

import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../store';

const Topbar = props => {
  const logoutUser = () => {
    if (props.spotifyPlayer._options) props.spotifyPlayer.disconnect();
    props.logout();
  };
  return (
    <div id="topbar">
      <h1>DOPALISCIOUS</h1>
      <a onClick={() => logoutUser()}>Logout</a>
    </div>
  );
};

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatch)(Topbar);
