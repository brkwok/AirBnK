import { fetchSpots } from './spot_actions';

export const UPDATE_FILTER = 'UPDATE_FILTER';

export const updateFilter = (filter, value) => {
  return (dispatch, getState) => {
    return fetchSpots(getState().ui.filters)(dispatch);
  };
};

export const changeFilter = (filter, value) => {
  return {
    type: UPDATE_FILTER,
    filter,
    value
  };
};
