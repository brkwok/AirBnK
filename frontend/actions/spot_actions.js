import * as SpotApiUtil from '../util/spot_api_util';

export const RECEIVE_ALL_SPOTS = 'RECEIVE_ALL_SPOTS';
export const RECEIVE_SPOT = 'RECEIVE_SPOT';

const receiveAllSpots = spots => {
  return {
    type: RECEIVE_ALL_SPOTS,
    spots
  };
};

export const fetchSpots = () => {
  return dispatch => {
    return SpotApiUtil.fetchSpots().then(
      spots => dispatch(receiveAllSpots(spots))
    );
  };
};