import React from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { getComments, me } from '../store';
import SpotifyPlayer from './SpotifyPlayer';

class Root extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadComments();
    this.props.authMe();
  }

  render() {
    return (
      <React.Fragment>
        <Chat />
        <SpotifyPlayer />
      </React.Fragment>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    loadComments: () => {
      dispatch(getComments());
    },
    authMe: () => {
      dispatch(me());
    },
  };
};

export default connect(null, mapDispatch)(Root);
