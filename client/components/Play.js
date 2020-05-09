import React from 'react';
import SpotifyPlayer from './SpotifyPlayer';
import Topbar from './Topbar';

import { connect } from 'react-redux';

import { setPlayer } from '../store';

const Play = props => {
  const mountMusicPlayer = token => {
    if (window.Spotify) {
      const player = new window.Spotify.Player({
        name: 'Dopaliscious Radio',
        getOAuthToken: cb => {
          cb(token);
        },
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('playback_error', ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener('player_state_changed', state => {});

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('player is ready');
        props.setDevice(device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    }
  };

  const { user, deviceId } = props;

  if (user && user.accessToken && !deviceId) {
    mountMusicPlayer(props.user.accessToken);
  }

  return (
    <div id="content">
      <Topbar />
      <div id="music">
        <SpotifyPlayer />
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    user: state.user,
    deviceId: state.deviceId,
  };
};

const mapDispatch = dispatch => {
  return {
    setDevice: deviceId => dispatch(setPlayer(deviceId)),
  };
};

export default connect(mapState, mapDispatch)(Play);
