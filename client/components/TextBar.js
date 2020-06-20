import React from 'react';
import { postComment } from '../store';
import { connect } from 'react-redux';

class TextBar extends React.Component {
  constructor() {
    super();
    this.state = {
      comment: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.sendComment(this.state.comment);
    this.setState({
      comment: '',
    });
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  render() {
    return (
      <form
        id="new-comment-form"
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value={this.state.comment}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </div>
      </form>
    );
  }
}

const mapDispatch = dispatch => ({
  sendComment: comment => {
    dispatch(postComment(comment));
  },
});

export default connect(null, mapDispatch)(TextBar);
