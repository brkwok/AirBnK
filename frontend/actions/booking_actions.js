import * as BookingApiUtil from '../util/booking_api_util';

export const RECEIVE_BOOKINGS = 'RECEIVE_BOOKINGS';
export const REMOVE_BOOKING = 'REMOVE_BOOKING';
export const RECEIVE_BOOKING_ERRORS = 'RECEIVE_BOOKING_ERRORS';

export const receiveBookings = bookings => {
  return {
    type: RECEIVE_BOOKINGS,
    bookings
  };
};

export const receiveErrors = err => {
  return {
    type: RECEIVE_BOOKING_ERRORS,
    err
  };
};

export const removeBooking = bookingId => {
  return {
    type: REMOVE_BOOKING,
    bookingId
  };
};

export const fetchBookings = () => {
  return dispatch => {
    return BookingApiUtil.fetchBookings().then(
      bookings => {
        return dispatch(receiveBookings(bookings));
      },
      (err) => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    );
  };
};

export const createBooking = (data) => {
  return dispatch => {
    return BookingApiUtil.createBooking(data).then(
      () => {
        return dispatch(fetchBookings());
      },
      (err) => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    );
  };
};

export const deleteBooking = bookingId => {
  return dispatch => {
    return BookingApiUtil.deleteBooking(bookingId).then(() => {
      return dispatch(removeBooking(bookingId));
    },
    (err) => {
      return dispatch(receiveErrors(err.responseJSON));
    });
  };
};
