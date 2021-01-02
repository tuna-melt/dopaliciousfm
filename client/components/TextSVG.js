import React, { useRef, useEffect } from 'react';

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

    const d = `M ${padding} ${padding} H ${width + padding} V ${height +
      padding} H ${padding} Z`;

    rect.current.setAttribute('d', d);
    mask.current.setAttribute('d', d);
    svg.current.setAttribute('height', height + padding * 2);
    svg.current.setAttribute('width', width + padding * 2);
    text.current.setAttribute('x', padding + width / 2);
    text.current.setAttribute('y', padding + height / 2);
  };

  const displaySVG = () => {
    if (text.current && rect.current && svg.current) {
      sizeSVG();
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
