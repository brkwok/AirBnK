import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER, RECEIVE_USER } from '../actions/session_actions';
import { RECEIVE_SPOT } from '../actions/spot_actions';
import { RECEIVE_REVIEWS } from '../actions/review_actions';
import { RECEIVE_BOOKINGS } from '../actions/booking_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser});
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id]: action.user} );
    case RECEIVE_SPOT:
    case RECEIVE_REVIEWS:
      return merge({}, state, action.user, action.users);
    default:
      return state;
  }
};

export default usersReducer;
