export const UPDATE_BOUNDS = 'UPDATE_BOUNDS';
export const UPDATE_GUESTS = 'UPDATE_GUESTS';

export const updateBounds = bounds => {
  return {
    type: UPDATE_BOUNDS,
    bounds
  };
};

export const updateGuests = guests => {
  return {
    type: UPDATE_GUESTS,
    guests
  };
};
