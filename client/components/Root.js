import React from 'react';
import { connect } from 'react-redux';
import Feed from './Feed';
import { getComments } from '../store';

class Root extends React.Component {
  constructor() {
    super();
    this.mountMusicPlayer();
  }

  mountMusicPlayer() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = '';
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
      // player.connect();
    };
  }

  componentDidMount() {
    this.props.loadComments();
  }

  render() {
    const comments = this.props.comments || [];
    return <Feed comments={comments} />;
  }
}

const mapState = state => {
  return { comments: state.comments };
};

const mapDispatch = dispatch => {
  return {
    loadComments: () => {
      dispatch(getComments());
    },
  };
};

export default connect(mapState, mapDispatch)(Root);
