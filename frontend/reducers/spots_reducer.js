import {
  RECEIVE_ALL_SPOTS,
  RECEIVE_SPOT
} from '../actions/spot_actions';
import { RECEIVE_REVIEWS } from '../actions/review_actions';
import { merge } from 'lodash';
import { RECEIVE_BOOKINGS } from '../actions/booking_actions';

const spotsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_SPOTS:
    case RECEIVE_BOOKINGS:
      return action.spots;
    case RECEIVE_SPOT:
    case RECEIVE_REVIEWS:
      return merge({}, state, { [action.spot.id]: action.spot });
    default:
      return state;
  }
};

export default spotsReducer;
