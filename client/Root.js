import React from 'react';
import { connect } from 'react-redux';

import { getComments, me } from './store';

import Routes from './routes';

class Root extends React.Component {
  componentDidMount() {
    this.props.loadComments();
    this.props.authMe();
  }

  render() {
    return (
      <React.Fragment>
        <Routes />
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
