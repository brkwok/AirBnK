import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SpotIndexItem extends React.Component {
  constructor(props) {

    super(props);
  }

  renderStars() {
    let rating = this.props.spot.avg_ratings;
    let ratingPercentage = rating / 5 * 100;
    let width = {width: `${ratingPercentage}%`};
    return (
      rating ? (
        <div className="stars-wrapper-show">
          <div className="stars-outer-show"><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
          <div className="stars-inner-show" style={width}><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
          </div>
        </div>
      )
      :
      (<div className="stars-wrapper-show"></div>)
    );
  }


  render() {
    const spot = this.props.spot;

    return(
      <Link to={`/spots/${spot.id}`} className="each-spot-container">
        <img className="localhost-logo" src={spot.img_url}/>
        <div className="spot-details">
          <span className="spot-type-location">{spot.type_of_spot} · {spot.location}</span>
          <span className="spot-title">{spot.title}</span>
          <span className="spot-cost">${spot.cost} per night</span>
          <div className="rating-wrap">
            {this.renderStars()}
            <span className="spot-rating">{spot.avg_ratings || 'No reviews yet'}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default withRouter(SpotIndexItem);
