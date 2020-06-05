import React from 'react';
import { connect } from 'react-redux';

import { toggleConnection, setVolume } from '../store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLink,
  faUnlink,
  faVolumeDown,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';

const Controls = props => {
  const toggleConnect = () => {
    if (props.player.connected) {
      props.spotifyPlayer.disconnect();
      props.toggleConnection();
    } else {
      props.spotifyPlayer.connect();
      props.toggleConnection();
    }
  };

  const upVolume = () => {
    if (props.spotifyPlayer._options) {
      console.log(props.player.volume);
      props.spotifyPlayer
        .setVolume(Math.min(props.player.volume + 0.1, 1))
        .then(() => {
          props.setVolume(Math.min(props.player.volume + 0.1, 1));
        });
    }
  };

  const downVolume = () => {
    if (props.spotifyPlayer._options) {
      props.spotifyPlayer
        .setVolume(Math.max(props.player.volume - 0.1, 0))
        .then(() => {
          props.setVolume(Math.max(props.player.volume - 0.1, 0));
        });
    }
  };

  const controls = (
    <React.Fragment>
      <button type="button" onClick={toggleConnect}>
        {props.player.connected ? (
          <FontAwesomeIcon icon={faUnlink} size="2x" color="#fff" />
        ) : (
          <FontAwesomeIcon icon={faLink} size="2x" color="#fff" />
        )}
      </button>
      <button type="button" onClick={downVolume}>
        <FontAwesomeIcon icon={faVolumeDown} size="2x" color="#fff" />
      </button>
      <button type="button" onClick={upVolume}>
        <FontAwesomeIcon icon={faVolumeUp} size="2x" color="#fff" />
      </button>
    </React.Fragment>
  );

  return <div id="controls">{props.spotifyPlayer && controls}</div>;
};

const mapState = state => ({ player: state.player });

const mapDispatch = dispatch => ({
  toggleConnection: () => dispatch(toggleConnection()),
  setVolume: newVolume => dispatch(setVolume(newVolume)),
});

export default connect(mapState, mapDispatch)(Controls);
