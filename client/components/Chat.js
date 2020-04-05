import React from 'react';
import Feed from './Feed';
import TextBar from './TextBar';
import { connect } from 'react-redux';

const Chat = props => {
  const { comments } = props;
  return (
    <React.Fragment>
      <Feed comments={comments} />
      <TextBar />
    </React.Fragment>
  );
};

const mapState = state => ({ comments: state.comments });

export default connect(mapState)(Chat);
