import '../styles/forms.scss';

import React from 'react';
import { connect } from 'react-redux';

import { login } from '../store';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.title = 'Dopaliscious';
  }

  handleSubmit(e) {
    e.preventDefault();

    try {
      this.props.login(this.state);
      this.props.history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="form-container">
        <h2>Welcome to *****</h2>
        <form onSubmit={this.handleSubmit} name="login">
          <div className="form-input">
            <label htmlFor="name">
              <small>Email</small>
            </label>
            <input
              name="email"
              type="text"
              required
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              type="password"
              required
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <a onClick={() => this.props.history.push('/signup')}>
            Are you new to the site?
          </a>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  login: user => {
    dispatch(login(user));
  },
});

export default connect(null, mapDispatch)(LoginForm);
