import { connect } from 'react-redux';
import Bookings from './bookings';
import { deleteBooking, fetchBookings } from '../../actions/booking_actions';

const msp = (state) => {
  return {
    bookings: state.entities.bookings,
    spots: state.entities.spots
  };
};

const mdp = dispatch => {
  return {
    fetchBookings: () => dispatch(fetchBookings()),
    deleteBooking: (bookingId) => dispatch(deleteBooking(bookingId))
  };
};

export default connect(msp, mdp)(Bookings);
