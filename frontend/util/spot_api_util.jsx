export const fetchSpots = (bounds) => {
  return $.ajax({
    method: 'GET',
    url: '/api/spots',
    data: {
      bounds
    }
  });
};

export const fetchSpot = (spotId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/spots/${spotId}`
  });
};
