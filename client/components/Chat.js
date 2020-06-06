import '../styles/chat.scss';

import React, { useState } from 'react';
import { connect } from 'react-redux';

import Feed from './Feed';
import TextBar from './TextBar';

const Chat = props => {
  const { comments } = props;

  const [isVisible, setVisible] = useState(false);

  return (
    <div id="chat" className={isVisible ? 'visible' : ''}>
      <button
        type="button"
        id="toggleChat"
        onClick={() => setVisible(!isVisible)}
      />
      <Feed comments={comments} />
      <TextBar />
    </div>
  );
};

const mapState = state => ({ comments: state.comments });

export default connect(mapState)(Chat);
