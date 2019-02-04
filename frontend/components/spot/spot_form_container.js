import { connect } from 'react-redux';
import { createSpot } from '../../actions/spot_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SpotForm from './spot_form';

const msp = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    errors: state.errors.spot
  };
};

const mdp = dispatch => ({
  createSpot: data => dispatch(createSpot(data)),
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(msp, mdp)(SpotForm);
