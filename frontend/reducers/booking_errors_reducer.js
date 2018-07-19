// import { merge } from 'lodash';
import { RECEIVE_BOOKING_ERRORS, RECEIVE_BOOKINGS } from '../actions/booking_actions';

const bookingErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOOKING_ERRORS:
      return action.err;
    case RECEIVE_BOOKINGS:
      return [];
    default:
      return state;
  }
};

export default bookingErrorsReducer;
