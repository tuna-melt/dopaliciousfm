import '../styles/visualizer.scss';

import React from 'react';
import { connect } from 'react-redux';

import TextSVG from './TextSVG';
import ProgressBar from './ProgressBar';

const Vizualizer = props => {
  const { player } = props;
  return (
    <div id="visualizer">
      {player.currentSong && player.currentSong.name && (
        <React.Fragment>
          <TextSVG value={player.currentSong.name} />
          <h3>
            by{' '}
            {player.currentSong.artists
              .map(artist => {
                return artist.name;
              })
              .join(', ')}
          </h3>
          <ProgressBar />
        </React.Fragment>
      )}
    </div>
  );
};

const mapState = state => {
  return {
    player: state.player,
  };
};

export default connect(mapState, null)(Vizualizer);
