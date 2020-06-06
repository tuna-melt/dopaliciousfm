import React from 'react';
import { connect } from 'react-redux';

import Visualizer from './Visualizer';
import Topbar from './Topbar';
import Chat from './Chat';
import Controls from './Controls';

import { setPlayer } from '../store';
import socket from '../socket';

class Play extends React.Component {
  constructor() {
    super();
    this.spotifyPlayer = {};
    this.mountMusicPlayer = this.mountMusicPlayer.bind(this);
  }

  mountMusicPlayer(token) {
    if (window.Spotify) {
      const player = new window.Spotify.Player({
        name: 'Dopaliscious Radio',
        getOAuthToken: cb => {
          cb(token);
        },
        volume: 0.5,
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
        this.spotifyPlayer = player;

        if (!this.props.deviceId || this.props.deviceId !== device_id) {
          this.props.setDevice(device_id);
        }
        socket.emit('get-current-song');
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    }
  }

  componentDidUpdate() {
    const { user } = this.props;

    if (this.spotifyPlayer._options) {
      this.spotifyPlayer._options.getOAuthToken = cb => {
        cb(user.accessToken);
      };
    }
  }

  componentDidMount() {
    socket.emit('get-current-song');
    const { user, deviceId } = this.props;

    if (user && user.accessToken && !deviceId) {
      this.mountMusicPlayer(user.accessToken);
    }
  }

  render() {
    const { currentSong, user } = this.props;

    if (currentSong.name) {
      document.title =
        currentSong.name +
        ' - ' +
        currentSong.artists.map(artist => artist.name).join(', ');
    }

    return (
      <div id="content">
        <Topbar spotifyPlayer={this.spotifyPlayer} />
        <div id="music">
          <Visualizer />
          {user && user.accessToken && (
            <Controls spotifyPlayer={this.spotifyPlayer} />
          )}
        </div>
        <Chat />
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    deviceId: state.player.deviceId,
    currentSong: state.player.currentSong,
  };
};

const mapDispatch = dispatch => {
  return {
    setDevice: deviceId => dispatch(setPlayer(deviceId)),
  };
};

export default connect(mapState, mapDispatch)(Play);
