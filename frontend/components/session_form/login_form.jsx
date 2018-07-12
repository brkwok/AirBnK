import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    const promise = this.props.login(user);
    console.log(promise);
    promise.then(this.props.closeModal);
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  demoLogin() {
    return this.props.demoLogin().then(this.props.closeModal);
  }

  render() {
    return (
      <div className="login-signup">
        <form onSubmit={this.handleSubmit} className="login-signup-formbox">
        <div onClick={this.props.closeModal} className="close-x">X</div>
          <div className="login-signup-box">Log in to continue</div>
          <div className="login-errors">{this.renderErrors()}</div>
          <div className="login-signup-box">

              <input className="login-signup-contentbox" type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email Address"
                />


              <input className="login-signup-contentbox" type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
                />


              <input className="login-signup-submit-button" type="submit" value="Log in" />
              <div className="login-signup-submit-button" id="demo" onClick={this.demoLogin}>Demo</div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
