import { merge } from 'lodash';
import {
  RECEIVE_REVIEWS,
  REMOVE_REVIEW,
} from '../actions/review_actions';
import { RECEIVE_SPOT } from '../actions/spot_actions';

const ReviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_REVIEWS:
    case RECEIVE_SPOT:
      return action.reviews || {};
    case REMOVE_REVIEW:
      const newState = merge({}, state);
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default ReviewsReducer;