import { UPDATE_BOUNDS } from '../actions/filter_actions';

let defaultState = {
  bounds: null,
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_BOUNDS:
      return action.bounds;
    default:
      return state;
  }
};
