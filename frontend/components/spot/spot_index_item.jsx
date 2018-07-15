import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SpotIndexItem extends React.Component {
  constructor(props) {

    super(props);
  }


  render() {
    const spot = this.props.spot;
    // const rating = spot.rating || [];
    // const ratingCount = rating.count || '';
    // const withRating = spot.rating + ' · ' + ratingCount;

    return(
      <Link to={`/spots/${spot.id}`} className="each-spot-container">
        <img src={window.house3}/>
        <div className="spot-details">
          <span className="spot-type-location">{spot.type_of_spot} · {spot.location}</span>
          <span className="spot-title">{spot.title}</span>
          <span className="spot-cost">${spot.cost} per night</span>
          <span className="spot-rating">{spot.rating || 'No reviews yet'}</span>
        </div>
      </Link>
    );
  }
}

export default withRouter(SpotIndexItem);
