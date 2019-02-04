import * as SpotApiUtil from '../util/spot_api_util';

export const RECEIVE_ALL_SPOTS = 'RECEIVE_ALL_SPOTS';
export const RECEIVE_SPOT = 'RECEIVE_SPOT';
export const RECEIVE_SPOT_ERRORS = 'RECEIVE_SPOT_ERRORS';

const receiveAllSpots = spots => {
  return {
    type: RECEIVE_ALL_SPOTS,
    spots
  };
};

const receiveSpot = payload => {
  return {
    type: RECEIVE_SPOT,
    spot: payload.spot,
    user: payload.user,
    users: payload.users,
    reviews: payload.reviews
  };
};

const receiveErrors = err => {
  return {
    type: RECEIVE_SPOT_ERRORS,
    err
  };
};

export const fetchSpots = (filters) => {
  return dispatch => {
    return SpotApiUtil.fetchSpots(filters).then(
      spots => dispatch(receiveAllSpots(spots))
    );
  };
};

export const fetchSpot = (spotId) => {
  return dispatch => {
    return SpotApiUtil.fetchSpot(spotId).then(
      spot => dispatch(receiveSpot(spot))
    );
  };
};

export const createSpot = (data) => {
  return dispatch => {
    return SpotApiUtil.createSpot(data).then(
      spot => dispatch(receiveSpot(spot)),
      err => dispatch(receiveErrors(err.responseJSON))
    );
  };
};
