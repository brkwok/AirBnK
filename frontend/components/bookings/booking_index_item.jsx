import React from 'react';

class BookingIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.cancelBooking = this.cancelBooking.bind(this);
    this.showSpot = this.showSpot.bind(this);
  }

  cancelBooking() {
    return this.props.deleteBooking(this.props.booking.id).then( () => {
      alert("Booking Cancelled!");
    });
  }

  showSpot() {
    this.props.history.push(`/spots/${this.props.booking.spot_id}`);
  }

  render() {
    const spots = this.props.spots;
    const booking = this.props.booking;
    const spotId = booking.spot_id;

    const checkOutDate = new Date(booking.check_out);
    const currDate = new Date();
    let bookingAction;

    if (checkOutDate < currDate) {
      bookingAction = <button className="booking-index-button" onClick={this.showSpot}>Leave Review</button>;
    } else {
      bookingAction = <button className="booking-index-button" onClick={this.cancelBooking}>Cancel Booking</button>;
    }

    return(
      <div className="booking-index-item-wrap">
        <div onClick={this.showSpot} className="booking-index-item">
          <img className="booking-index-img" className="booking-index-img" src={spots[spotId].photoUrl}></img>
          <div className="booking-index-info-wrap">
            <div className="booking-index-info">
              <div className="booking-index-title">{spots[spotId].title}</div>
              <div className="booking-index-check"><span>Check-in:</span><span>{booking.check_in}</span></div>
              <div className="booking-index-check"><span>Check-out:</span><span>{booking.check_out}</span></div>
            </div>
            <div className="booking-index-button-wrap">
              {bookingAction}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingIndexItem;
