import React from 'react';
import { withRouter } from 'react-router-dom';

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
    debugger
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user).then(() => {
      this.props.history.push('/');
    });
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
        Log In
        {this.renderErrors()}
          <div className="login-signup-box">
            <label>Email
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                />
            </label>
            <label>Password
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                />
            </label>

            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
