import * as ReviewApiUtil from '../util/review_api_util';

export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';
export const RECEIVE_REVIEW_ERRORS = 'RECEIVE_REVIEW_ERRORS';

export const receiveReviews = payload => {
  return {
    type: RECEIVE_REVIEWS,
    reviews: payload.reviews,
    spot: payload.spot,
    user: payload.user,
    users: payload.users
  };
};

export const receiveErrors = err => {
  return {
    type: RECEIVE_REVIEW_ERRORS,
    err
  };
};

export const removeReview = reviewId => {
  return {
    type: REMOVE_REVIEW,
    reviewId
  };
};

export const fetchReviews = () => {
  return dispatch => {
    return ReviewApiUtil.fetchReviews().then(
      reviews => {
        return dispatch(receiveReviews(reviews));
      },
      (err) => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    );
  };
};

export const createReview = (data) => {
  return dispatch => {
    return ReviewApiUtil.createReview(data).then(
      (payload) => {
        return dispatch(receiveReviews(payload));
      },
      (err) => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    );
  };
};

export const deleteReview = reviewId => {
  return dispatch => {
    return ReviewApiUtil.deleteReview(reviewId).then(
      () => {
        return dispatch(removeReview(reviewId));
      },
      (err) => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    );
  };
};
