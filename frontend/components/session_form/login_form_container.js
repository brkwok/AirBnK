import { connect } from 'react-redux';
import React from 'react';
import { login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import LoginForm from './login_form';


const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  const demoUser = { email: 'demo', password: '123456' };
  return {
    login: (user) => dispatch(login(user)),
    closeModal: () => dispatch(closeModal()),
    demoLogin: () => dispatch(login(demoUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
