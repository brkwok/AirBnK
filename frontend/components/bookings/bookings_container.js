import { connect } from 'react-redux';
import Bookings from './bookings';
import { deleteBooking, fetchBookings } from '../../actions/booking_actions';
import { fetchUser } from '../../actions/session_actions';

const msp = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    bookings: state.entities.bookings,
    spots: state.entities.spots,
    history: ownProps.history,
  };
};

const mdp = dispatch => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    fetchBookings: () => dispatch(fetchBookings()),
    deleteBooking: (bookingId) => dispatch(deleteBooking(bookingId))
  };
};

export default connect(msp, mdp)(Bookings);
