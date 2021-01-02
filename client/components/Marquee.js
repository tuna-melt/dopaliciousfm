import '../styles/marquee.scss';

import React from 'react';

class Marquee extends React.Component {
  constructor() {
    super();
    const rows = 14;
    const columns = 35;

    this.table = [];
    this.cover = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        if (i === 0) {
          this.cover.push(
            <div
              key={i + '' + j}
              className="cover"
              style={{
                transitionTimingFunction: 'bezier-curve',
                transitionDelay: `${0.02 * Math.random()}s`,
                transition: ` height ${0.3 * Math.random() + 0.3}s`,
              }}
            />
          );
        }
        row.push(<td className="pixel" key={i + '' + j} />);
      }

      this.table.push(<tr key={i + 'row'}>{row}</tr>);
    }
  }

  render() {
    const { bounce } = this.props;

    return (
      <div id="marquee">
        <div className="pixels">
          <table>
            <tbody>{this.table}</tbody>
          </table>
          <div className={`cover-container ${!bounce ? 'bounce' : ''}`}>
            {this.cover}
          </div>
        </div>
      </div>
    );
  }
}

export default Marquee;
