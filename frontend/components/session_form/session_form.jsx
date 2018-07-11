import { Component } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          value={this.state.username}
          onChange={this.updateField('email')} />
        <input type="password"
          value={this.state.password}
          onChange={this.updateField('password')} />
        <button>{this.props.formType}</button>
      </form>
    );
  }
}

export default withRouter(SessionForm);
