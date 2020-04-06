import React from 'react';
import { connect } from 'react-redux';

import { setPlayer } from '../store';

const SpotifyPlayer = props => {
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

  const { user } = props;
  if (user && user.accessToken) {
    mountMusicPlayer(props.user.accessToken);
  }

  return <h1>Player</h1>;
};

const mapState = state => {
  return { user: state.user };
};

const mapDispatch = dispatch => {
  return {
    setDevice: deviceId => dispatch(setPlayer(deviceId)),
  };
};

export default connect(mapState, mapDispatch)(SpotifyPlayer);
