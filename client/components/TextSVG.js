import React, { useRef, useEffect } from 'react';

const TextSVG = props => {
  const mask = useRef(null);
  const rect = useRef(null);
  const text = useRef(null);

  const maskId = props.value.split(' ').join('-');
  const styles = {
    mask: `url(#${maskId})`,
    WebkitMask: `url(#${maskId})`,
  };

  const sizeSVG = () => {
    if (text.current && rect.current) {
      const textBox = text.current.getBBox();

      const padding = 30;
      let width = textBox.width + padding;
      const height = textBox.height + padding;

      if (width < 500) width = 500;

      rect.current.setAttribute('width', width);
      rect.current.setAttribute('height', height);
      mask.current.setAttribute('width', width);
      mask.current.setAttribute('height', height);
      text.current.setAttribute('x', width / 2);
      text.current.setAttribute('y', height / 2);
    }
  };

  useEffect(sizeSVG);

  return (
    <svg className="svg-displayer">
      <defs>
        <mask id={maskId}>
          <rect fill="#fff" ref={mask} />
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

      <rect width="100%" fill="#fff" ref={rect} style={styles} />
    </svg>
  );
};

export default TextSVG;
