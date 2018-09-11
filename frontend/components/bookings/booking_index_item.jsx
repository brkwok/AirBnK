import React from 'react';

class BookingIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.cancelBooking = this.cancelBooking.bind(this);
  }

  cancelBooking() {
    return this.props.deleteBooking(this.props.booking.id);
  }

  showSpot() {

  }

  render() {
    const spots = this.props.spots;
    const booking = this.props.booking;
    const spotId = booking.spot_id;

    return(
      <div>
        <div>
          <img onClick={this.showSpot} className="booking-index-img" src={spots[spotId].img_url}></img>
          <div>
            <div>
              <div>{spots[spotId].title}</div>
              <div><span>{booking.check_in}</span> - <span>{booking.check_out}</span></div>
            </div>
            <button onClick={this.cancelBooking}>Cancel Booking</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingIndexItem;
