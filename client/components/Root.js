import React from 'react';
import { connect } from 'react-redux';
import Feed from './Feed';
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
    const comments = this.props.comments || [];
    return (
      <React.Fragment>
        <Feed comments={comments} />
        <SpotifyPlayer />
      </React.Fragment>
    );
  }
}

const mapState = state => {
  return { comments: state.comments };
};

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

export default connect(mapState, mapDispatch)(Root);
