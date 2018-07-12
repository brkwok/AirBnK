import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    return this.props.openModal();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signup(user).then(this.props.closeModal);
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
        Sign Up
        {this.renderErrors()}
          <div className="login-signup-box">

              <input className="login-signup-contentbox" type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email Address"
                />

              <input className="login-signup-contentbox" type="name"
                value={this.state.name}
                onChange={this.update('name')}
                placeholder="Name"
                />

              <input className="login-signup-contentbox" type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Create Password"
                />




            <input className="login-signup-submit-button" type="submit" value="Sign in" />
            <div className="to-signup">Already have an Airbnb account? <strong className="to-login-signup-modal" onClick={this.openModal}>Log in</strong></div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
