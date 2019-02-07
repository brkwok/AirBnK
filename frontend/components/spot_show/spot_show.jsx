import React from 'react';
import SpotDetail from './spot_detail';
import SpotBookingFormContainer from './spot_booking_form_container';

class SpotShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

  }

  componentDidMount() {
    this.props.fetchUser(this.props.user.id);
    this.props.fetchSpot(this.props.spotId);
  }

  render() {
    return(
      <section>
        <section className="spot-show-img-container">
          <img className="spot-show-img" src={`${this.props.spot.photoUrl}`} />
        </section>
        <section className="spot-booking-show-container">
          <SpotDetail
            reviews={this.props.reviews}
            spot={this.props.spot}
            spotId={this.props.spotId}
            users={this.props.users}/>
          <section className="booking-show">
          <SpotBookingFormContainer
            spot={this.props.spot}
          />
        </section>
      </section>
    </section>
    );
  }
}

export default SpotShow;
