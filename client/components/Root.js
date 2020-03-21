import React from 'react';

class Root extends React.Component {
  constructor() {
    super();
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token =
        'BQAmaD6CL3qmtadMXtkyK56JYzgKkZxtPO4hUHupJtWA0F5OZbY69va3fmbnlYP9ELEOqt3TDjhWkEjzUAy1DAuVcSzTy_SNoyNhpUB9UOWIHuReGDsslpYl9wELIeXc9mPxLTuIpEglNbQqKwn2jmh90R2yr9pqUzE';
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
