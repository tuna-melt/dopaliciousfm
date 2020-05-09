import React from 'react';
import { connect } from 'react-redux';

const SpotifyPlayer = props => {
  const { currentSong } = props;

  const sizeSVG = () => {};

  return (
    <div id="player">
      {currentSong.name && (
        <React.Fragment>
          <svg id="song-title">
            <defs>
              <mask id="mask">
                <rect width="100%" fill="#fff" />
                <text fill="#000" fontSize="50" transform="translate(0,50)">
                  {currentSong.name}
                </text>
              </mask>
            </defs>

            <rect width="100%" fill="#fff" />
          </svg>
        </React.Fragment>
      )}
    </div>
  );
};

const mapState = state => {
  return {
    currentSong: state.currentSong,
  };
};

export default connect(mapState, null)(SpotifyPlayer);
