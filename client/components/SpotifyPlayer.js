import React from 'react';
import { connect } from 'react-redux';

import TextSVG from './TextSVG';

const SpotifyPlayer = props => {
  const { currentSong } = props;

  return (
    <div id="player">
      {currentSong.name && (
        <React.Fragment>
          <TextSVG value={currentSong.name} />
          {currentSong.artists.map(artist => {
            return <TextSVG key={artist.name} value={artist.name} />;
          })}
        </React.Fragment>
      )}
    </div>
  );
};

const mapState = state => {
  return {
    currentSong: state.player.currentSong,
  };
};

export default connect(mapState, null)(SpotifyPlayer);
