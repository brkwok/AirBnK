import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SignupForm from './signup_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal('login'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
