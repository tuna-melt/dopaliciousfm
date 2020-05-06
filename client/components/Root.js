import React from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { getComments, me } from '../store';
import SpotifyPlayer from './SpotifyPlayer';
import Visualizer from './Visualizer';
import Topbar from './Topbar';
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
        <Topbar />
        <div id="content">
          <div id="music">
            <Visualizer />
            <SpotifyPlayer />
          </div>
          <Chat />
        </div>
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
