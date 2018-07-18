import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SpotDetail from './spot_detail';
import BookingForm from './spot_booking_form';

class SpotShow extends React.Component {
  componentDidMount() {
    this.props.fetchSpot(this.props.match.params.spotId);
  }

  render() {
    return(
      <section>
        <section className="spot-show-img-container">
          <img className="spot-show-img" src={window.house3} />
        </section>
        <section className="spot-booking-show-container">
          <SpotDetail spot={this.props.spot} user={this.props.user} spotId={this.props.spotId} />
          <section className="booking-show">
            <BookingForm />
          </section>
        </section>
      </section>
    );
  }
}

export default SpotShow;
