import React from 'react';
import BookingIndex from './booking_index';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchUser(this.props.currentUser.id);
    }
    this.props.fetchBookings();
  }

  render() {
    return (
      <div className="bookings-wrap">
        <BookingIndex
          bookings={this.props.bookings}
          spots={this.props.spots}
          deleteBooking={this.props.deleteBooking}
          history={this.props.history}
          />
      </div>
    );
  }
}

export default Bookings;
