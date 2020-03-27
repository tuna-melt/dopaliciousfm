import React from 'react';

class Root extends React.Component {
  constructor() {
    super();
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token =
        'BQDPch0Rl2ezkCoZkDq0mHupYb3CnwXchdJP3dL5rFv4oIbK2dKDdYSgq77w5k6Yunx79yuoaq0-10e3spWBuNLicxZUgI2opuhpFyNFRx1c1qWMHu0dUevueWZCCDYkEEk5DBArTqwFkegj-ajI5vIl4nLQCKFKYmQ';
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
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
      player.addListener('player_state_changed', state => {
        console.log(state);
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }
  render() {
    return 'Hello World';
  }
}

export default Root;
