export const fetchBookings = () => {
  return $.ajax({
    method: "GET",
    url: 'api/bookings',
  });
};

export const createBooking = data => {
  return $.ajax({
    method: 'POST',
    url: '/api/bookings',
    data
  });
};

export const deleteBooking = bookingId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/bookings/${bookingId}`
  });
};
