import React from 'react';

class UserShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 9,
      reviews: this.props.reviews,
    };

    this.linkToSpot = this.linkToSpot.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }

  linkToSpot(e) {
    e.preventDefault;

    this.props.history.push(`/spots/${e.target.id}`);
  }

  deleteReview(e) {
    e.preventDefault;

    this.props.deleteReview(e.target.id);
  }

  render() {
    const user = this.props.user;
    const spots = this.props.spots || {};

    const reviews = this.props.reviews.map( (review) => {
      return(
        <div className='user-show-review' key={review.id}>
          <div className="user-show-review-spot-container">
            <div className="user-show-review-header">
              <div className="user-show-review-spot-img">
                <img id={review.spot_id} onClick={this.linkToSpot} className="user-show-img" src={spots[review.spot_id].img_url} />
              </div>
              <div id={review.spot_id} onClick={this.linkToSpot} className="user-show-spot-title">
                {spots[review.spot_id].title}
              </div>
            </div>
            {(this.props.currentUserId !== this.props.userId) ? <div id={review.id} onClick={this.deleteReview} className="delete-review">x</div> : <div></div>}
          </div>
          <div>{review.comment}</div>
        </div>
      );
    });

    return(
      <section className="user-show">
        <div className="user-show-profile-pic-container">
          <img className="user-show-profile-pic"  src={user.img_url} />
        </div>
        <div className="user-show-intro-reviews">
          <div className="user-show-header">
            <div className="user-show-username"><span>Hey, I'm </span>{user.name}!</div>
          </div>
          <div className="user-show-review-container">
            <div className="user-show-review-header">Reviews</div>
            {reviews}
          </div>
        </div>
      </section>
    );
  }
}

export default UserShow;
