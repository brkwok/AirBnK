import {
  RECEIVE_ALL_SPOTS,
  RECEIVE_SPOT
} from '../actions/spot_actions';
import { RECEIVE_REVIEWS } from '../actions/review_actions';
import { merge } from 'lodash';
import { RECEIVE_BOOKINGS } from '../actions/booking_actions';
import { RECEIVE_USER } from '../actions/session_actions';

const spotsReducer = (state = {}, action) => {

  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_SPOTS:
      return action.spots || {};
    case RECEIVE_BOOKINGS:
    case RECEIVE_USER:
      return merge({}, state, action.spots);
    case RECEIVE_SPOT:
    case RECEIVE_REVIEWS:
      return merge({}, state, { [action.spot.id]: action.spot });
    default:
      return state;
  }
};

export default spotsReducer;
