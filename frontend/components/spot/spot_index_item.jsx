import React from 'react';
import { withRouter } from 'react-router-dom';

class SpotIndexItem extends React.Component {
  constructor(props) {

    super(props);
  }


  render() {
    const spot = this.props.spot;

    return(
      <div className="each-spot-container">
        <div className="spot-image">
          <img src={window.logoURL}/>
        </div>
        <div className="spot-details">
          <span className="spot-type-location">{spot.type_of_spot}·{spot.location}</span>
          <span className="spot-title">{spot.title}</span>
          <span className="spot-cost">{spot.cost} per night</span>
          <span className="spot-rating">{spot.rating}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(SpotIndexItem);
