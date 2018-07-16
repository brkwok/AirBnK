import { fetchSpots } from './spot_actions';

export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_BOUNDS = 'UPDATE_BOUNDS';

export const updateBounds = bounds => {
  return {
    type: UPDATE_BOUNDS,
    bounds
  };
};
