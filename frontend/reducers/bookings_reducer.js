import { merge } from 'lodash';
import {
  RECEIVE_BOOKINGS,
  REMOVE_BOOKING
} from '../actions/booking_actions';
import { RECEIVE_ALL_SPOTS } from '../actions/spot_actions';
import { RECEIVE_USER } from '../actions/session_actions';

const BookingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOOKINGS:
    case RECEIVE_ALL_SPOTS:
    case RECEIVE_USER:
      return action.bookings || {};
    case REMOVE_BOOKING:
      const newState = merge({}, state);
      delete newState[action.bookingId];
      return newState;
    default:
      return state;
  }
};

export default BookingsReducer;
