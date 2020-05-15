import React, { useRef, useEffect } from 'react';

const LineSVG = props => {
  const { progress, duration, width } = props;

  const svg = useRef(null);
  const top = useRef(null);
  const bottom = useRef(null);

  const style = { fill: '#fff' };

  const sizeSVG = () => {
    bottom.current.setAttribute('d', `M 0 0 H ${width} V ${5} H 0 Z`);
    const d = `M 0 0 H ${(width * progress) / duration} V ${5} H 0 Z`;
    top.current.setAttribute('d', d);
  };

  useEffect(sizeSVG, [progress]);

  return (
    <svg width={width} height={5} ref={svg}>
      <path height={10} fill="#ffffffaa" ref={bottom} />
      <path height={10} style={style} ref={top} />
    </svg>
  );
};

export default LineSVG;
