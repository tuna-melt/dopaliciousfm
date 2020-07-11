import '../styles/marquee.scss';

import React, { useRef, useEffect } from 'react';

const Marquee = props => {
  const rows = 14;
  const columns = 35;

  const table = [];
  const cover = [];

  useEffect(() => {});

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      if (i === 0) {
        cover.push(
          <div
            className="cover"
            style={{
              animationDelay: `${0.75 + 0.5 * Math.random()}s`,
              animationDuration: `${1.5 * Math.random() + 0.5}s`,
            }}
          />
        );
      }
      row.push(<td className="pixel" />);
    }

    table.push(<tr>{row}</tr>);
  }

  return (
    <div id="marquee">
      <div className="pixels">
        <table>
          <tbody>{table}</tbody>
        </table>
        <div className="cover-container">{cover}</div>
      </div>
    </div>
  );
};

export default Marquee;
