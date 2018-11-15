import { connect } from 'react-redux';
import SpotBookingForm from './spot_booking_form';
import { openModal } from '../../actions/modal_actions';
import { createBooking } from '../../actions/booking_actions';

const msp = (state) => {
  return {
    currentUserId: state.session.id,
    errors: state.errors.booking,
  };
};

const mdp = dispatch => {
  return {
    createBooking: (data) => dispatch(createBooking(data)),
    openModal: (modal) => dispatch(openModal(modal))
  };
};

export default connect(msp, mdp)(SpotBookingForm);
