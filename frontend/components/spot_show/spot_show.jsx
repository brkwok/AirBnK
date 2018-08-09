import React from 'react';
// import { Link, withRouter } from 'react-router-dom';
import SpotDetail from './spot_detail';
import BookingFormContainer from './spot_booking_form_container';

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
          <SpotDetail
            reviews={this.props.reviews}
            spot={this.props.spot}
            user={this.props.user} spotId={this.props.spotId}
            users={this.props.users}/>
          <section className="booking-show">
            <BookingFormContainer spot={this.props.spot}/>
          </section>
        </section>
      </section>
    );
  }
}

export default SpotShow;
