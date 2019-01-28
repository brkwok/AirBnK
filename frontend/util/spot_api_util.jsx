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

export const createSpot = (data) => {
  return $.ajax({
    method: "POST",
    url: "/api/spots",
    data,
    contentType: false,
    processData: false,
  });
};
