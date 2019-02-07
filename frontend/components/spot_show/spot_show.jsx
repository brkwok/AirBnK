import React from 'react';
import SpotDetail from './spot_detail';
import SpotBookingFormContainer from './spot_booking_form_container';

class SpotShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      spotLoaded: false
    };

  }

  componentDidMount() {
    this.props.fetchSpot(this.props.spotId);
  }

  componentDidUpdate(pP, pS) {

    if (pP.spot.id !== this.props.spot.id) {
      this.setState({
        spotLoaded: true,
      });
    } else {

      return;
    }
  }

  render() {
    const spotDetail = this.state.spotLoaded ?
        (<SpotDetail
          reviews={this.props.reviews}
          spot={this.props.spot}
          spotId={this.props.spotId}
          users={this.props.users}
          user={this.props.user}
          />)
        :
        (<div></div>);

    return(
      <section>
        <section className="spot-show-img-container">
          <img className="spot-show-img" src={`${this.props.spot.photoUrl}`} />
        </section>
        <section className="spot-booking-show-container">
          {spotDetail}
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
