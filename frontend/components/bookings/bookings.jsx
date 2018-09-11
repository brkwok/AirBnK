import React from 'react';
import BookingIndex from './booking_index';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bookings-wrap">
        <BookingIndex
          bookings={this.props.bookings}
          spots={this.props.spots}
          deleteBooking={this.props.deleteBooking}
          />
      </div>
    );
  }
}

export default Bookings;
