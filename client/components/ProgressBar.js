import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import LineSVG from './LineSVG';

const getTimeStr = time => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time / 1000) % 60);

  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

// ty https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ProgressBar = props => {
  const { player } = props;
  const { startPosition, currentSong } = player;

  const [position, setPosition] = useState(startPosition);

  useInterval(() => setPosition(position + 50), 50);

  useEffect(() => setPosition(player.startPosition), [player]);

  return (
    <div id="progress-bar">
      <p>{getTimeStr(position)}</p>
      <LineSVG
        progress={position}
        duration={currentSong.duration_ms}
        width={500}
      />
      <p>{getTimeStr(currentSong.duration_ms)}</p>
    </div>
  );
};

const mapState = state => ({ player: state.player });

export default connect(mapState, null)(ProgressBar);
