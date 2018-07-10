import React from 'react';
import ReactDOM from 'react-dom';
import * as sessions from './util/session_api_util';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');

  window.signup = sessions.signup;
  window.login = sessions.login;
  window.logout = sessions.logout;
  ReactDOM.render(<h1>hello</h1>, root);
});
