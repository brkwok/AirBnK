import React from 'react';
import BookingIndexItem from './booking_index_item';

class BookingIndex extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const bookings = Object.values(this.props.bookings) || [];
    const bookingsSorted = bookings.sort((booking1, booking2) => {
      const date1 = booking1.check_in;
      const date2 = booking2.check_in;

      if (date1 > date2) {
        return 1;
      } else if (date2 > date1) {
        return -1;
      } else {
        return 0;
      }
    });
    const spots = this.props.spots || {};

    let index = bookingsSorted.map ( (booking) => {
      return (
        <BookingIndexItem
          key={booking.id}
          booking={booking}
          spots={spots}
          deleteBooking={this.props.deleteBooking}
          history={this.props.history}
          />
      );
    });

    return(
      <div className="bookings-index">
        {index}
      </div>
    );
  }
}

export default BookingIndex;
