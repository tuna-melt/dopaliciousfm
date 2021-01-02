import '../styles/topbar.scss';

import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

import { logout } from '../store';

const Topbar = props => {
  const logoutUser = () => {
    if (props.spotifyPlayer._options) props.spotifyPlayer.disconnect();
    props.logout();
  };
  return (
    <div id="topbar">
      <h1>DOPALISCIOUS</h1>
      <div className="dropDown-container">
        <button type="button">
          <FontAwesomeIcon icon={faUserAstronaut} size="2x" color="#fff" />
        </button>
        <ul className="dropDown" id="userOptions">
          <li onClick={logoutUser}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatch)(Topbar);
