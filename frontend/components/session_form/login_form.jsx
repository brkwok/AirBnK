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

  render() {
    return (
      <div className="login-signup">
        <form onSubmit={this.handleSubmit} className="login-signup-formbox">
        <div onClick={this.props.closeModal} className="close-x">X</div>
        Log in to continue
        {this.renderErrors()}
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
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
