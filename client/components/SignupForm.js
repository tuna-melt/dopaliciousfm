import '../styles/forms.scss';

import React from 'react';
import { connect } from 'react-redux';

import { signup } from '../store';

class SignupForm extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.signup({
      email: e.target.email.value,
      name: e.target.name.value,
      password: e.target.password.value,
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="form-container">
        <h2>Join the fun!</h2>
        <form onSubmit={this.handleSubmit} name="register">
          <div className="form-input">
            <label htmlFor="name">
              <small>Name</small>
            </label>
            <input name="name" type="text" required />
          </div>
          <div className="form-input">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" required />
          </div>
          <div className="form-input">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" required />
          </div>
          <a onClick={() => this.props.history.push('/login')}>
            Already have an account?
          </a>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  signup: user => dispatch(signup(user)),
});

export default connect(null, mapDispatch)(SignupForm);
