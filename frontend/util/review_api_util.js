export const fetchReviews = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/reviews',
  });
};

export const createReview = (data) => {
  return $.ajax({
    method: 'POST',
    url: '/api/reviews',
    data
  });
};

export const deleteReview = (reviewId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/reviews/${reviewId}`
  });
};
