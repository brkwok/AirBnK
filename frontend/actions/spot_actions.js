import * as SpotApiUtil from '../util/spot_api_util';

export const RECEIVE_ALL_SPOTS = 'RECEIVE_ALL_SPOTS';
export const RECEIVE_SPOT = 'RECEIVE_SPOT';

const receiveAllSpots = spots => {
  return {
    type: RECEIVE_ALL_SPOTS,
    spots
  };
};

export const fetchSpots = (filters) => {
  return dispatch => {
    return SpotApiUtil.fetchSpots(filters).then(
      spots => dispatch(receiveAllSpots(spots))
    );
  };
};
