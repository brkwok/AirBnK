import React from 'react';
import BookingIndexItem from './booking_index_item';

class BookingIndex extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const bookings = Object.values(this.props.bookings) || [];
    const spots = this.props.spots || {};

    let index = bookings.map ( (booking) => {
      return (
        <BookingIndexItem
          key={booking.id}
          booking={booking}
          spots={spots}
          deleteBooking={this.props.deleteBooking}
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
