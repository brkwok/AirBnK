import { RECEIVE_SPOT, RECEIVE_SPOT_ERRORS } from '../actions/spot_actions';

const spotErrorsReducer = (state =[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SPOT_ERRORS:
      return action.err || [];
    case RECEIVE_SPOT:
      return [];
    default:
      return state;
  }
};

export default spotErrorsReducer;
