
import { merge } from 'lodash';
import {
  RECEIVE_REVIEWS,
  REMOVE_REVIEW,
} from '../actions/review_actions';
import { RECEIVE_SPOT, RECEIVE_ALL_SPOTS } from '../actions/spot_actions';
import { RECEIVE_USER } from '../actions/session_actions';

const ReviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_REVIEWS:
      return action.reviews || {};
    case RECEIVE_SPOT:
    case RECEIVE_ALL_SPOTS:
    case RECEIVE_USER:
      return merge({}, state, action.reviews);
    case REMOVE_REVIEW:
      const newState = merge({}, state);
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default ReviewsReducer;
