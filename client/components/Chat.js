import '../styles/chat.scss';

import React, { useState } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import Feed from './Feed';
import TextBar from './TextBar';

const Chat = props => {
  const { comments } = props;

  const [isVisible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <button
        type="button"
        id="toggleChat"
        className={isVisible ? 'visible' : ''}
        onClick={() => setVisible(!isVisible)}
      >
        <FontAwesomeIcon
          icon={faCommentAlt}
          className="fa-flip-horizontal"
          size="2x"
          color="#fff"
        />
      </button>
      <div id="chat" className={isVisible ? 'visible' : ''}>
        <div className="header">
          <button
            type="button"
            className="colapse"
            onClick={() => setVisible(!isVisible)}
          >
            <FontAwesomeIcon icon={faTimes} size="1x" />
          </button>
        </div>
        <div className="content">
          <Feed comments={comments} isVisible={isVisible} />
        </div>
        <TextBar />
      </div>
    </React.Fragment>
  );
};

const mapState = state => ({ comments: state.comments });

export default connect(mapState)(Chat);
