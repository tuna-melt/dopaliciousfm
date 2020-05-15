import React, { useRef, useEffect } from 'react';
import Warp from 'warpjs';

const TextSVG = props => {
  const svg = useRef(null);
  const mask = useRef(null);
  const rect = useRef(null);
  const text = useRef(null);

  const maskId = props.value
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .join('-');

  const styles = {
    mask: `url(#${maskId})`,
    WebkitMask: `url(#${maskId})`,
  };

  const sizeSVG = () => {
    const textBox = text.current.getBBox();

    const padding = 25;
    let width = textBox.width + 2 * padding;
    const height = textBox.height + padding;

    // if (width < 500) width = 500;

    const d = `M ${padding} ${padding} H ${width + padding} V ${height +
      padding} H ${padding} Z`;

    rect.current.setAttribute('d', d);
    mask.current.setAttribute('d', d);
    svg.current.setAttribute('height', height + padding * 2);
    svg.current.setAttribute('width', width + padding * 2);
    text.current.setAttribute('x', padding + width / 2);
    text.current.setAttribute('y', padding + height / 2);
  };

  const animateSVG = ref => {
    const warpObj = new Warp(ref.current);

    warpObj.interpolate(4);

    warpObj.transform(([x, y]) => [x, y, y]);
    let offset = 0;

    const animate = () => {
      warpObj.transform(([x, y, oy]) => [
        x,
        oy + 4 * Math.sin(x / 32 + offset),
        oy,
      ]);
      offset += 0.1;
      requestAnimationFrame(animate);
    };

    animate(0);
  };

  const displaySVG = () => {
    if (text.current && rect.current && svg.current) {
      sizeSVG();
      // animateSVG(svg);
    }
  };

  useEffect(displaySVG);

  return (
    <svg className="svg-displayer" ref={svg}>
      <defs>
        <mask id={maskId}>
          <path fill="#fff" ref={mask} />
          <text
            fill="#000"
            fontSize="50"
            textAnchor="middle"
            dominantBaseline="middle"
            ref={text}
          >
            {props.value}
          </text>
        </mask>
      </defs>

      <path fill="#fff" ref={rect} style={styles} />
    </svg>
  );
};

export default TextSVG;
