import React from 'react';
import { Link } from 'react-router-dom';
import ReviewFormContainer from '../reviews/review_form_container';


export default ({ spot, user, reviews, users }) => {
  let eachSpot = spot || {};
  let link = '';
  if (typeof user === 'undefined' || user.length === 0) { return; } else { link = (
      <Link to="">
        <img  className="user-profile-pic" src={user.img_url} />
      </Link>
    );
  }
  let name = '';
  if (typeof user === 'undefined') { return; } else {
    name = (<div className="user-username">{user.name}</div>);
  }

  let reviewDisp;
  if ((typeof reviews === "undefined") || (reviews.length === 0)) {
  } else {

    reviewDisp = reviews.sort((review1, review2) => {
      const date1 = new Date(review1.created_at);
      const date2 = new Date(review2.created_at);
      return date2 - date1;
    }).map(review => {
      debugger
      return (
        <div key={review.id} className="each-review-container">
          <div className="each-review-container-top">
            <div className="review-picture-container">
              <img className="review-profile-picture" src={users[review.user_id].img_url}></img>
            </div>
            <div className="review-user-detail-container">
              <div className="review-username">{users[review.user_id].name}</div>
              <div className="review-timestamp">{new Date(review.created_at).toString().split("GMT")[0]}</div>
            </div>
          </div>
          <div className="review-comment">{review.comment}</div>
        </div>
      );
    });
  }

  let rating = eachSpot.avg_ratings;
  let ratingPercentage = rating / 5 * 100;
  let width = {width: `${ratingPercentage}%`};

  const renderStars = rating ? (
      <div className="stars-wrapper-review-list">
        <div className="stars-outer-review-list"><i className="far fa-star star-review-list"></i><i className="far fa-star star-review-list"></i><i className="far fa-star star-review-list"></i><i className="far fa-star star-review-list"></i><i className="far fa-star star-review-list"></i>
        <div className="stars-inner-review-list" style={width}><i className="fas fa-star star-review-list"></i><i className="fas fa-star star-review-list"></i><i className="fas fa-star star-review-list"></i><i className="fas fa-star star-review-list"></i><i className="fas fa-star star-review-list"></i></div>
        </div>
      </div>
    )
    :
    (<div className="stars-wrapper"></div>);

  const totalReview = reviews ? (
    <div className="review-total">{reviews.length} Reviews</div>
  ) : (
    <div className="review-total">No reviews yet</div>
  );

  return(
    <section className="spot-header">
      <div className="spot-detail-divider">
        <span className="spot-type-show">{eachSpot.type_of_spot}</span>
        <section className="spot-detail-wrap">
          <section className="spot-title-type-location">
            <span className="spot-title-show">{eachSpot.title}</span>
            <span className="spot-location-show">{eachSpot.location}</span>
          </section>
          <section className="user-profile-container">
            {link}
            {name}
          </section>
        </section>
        <div className="spot-configs">
          <span className="spot-detail-others">
            <i className="fas fa-users"></i>
            {eachSpot.guests} guests
          </span>
          <span className="spot-detail-others">
            <i className="fas fa-door-open"></i>
            {eachSpot.bedroom} bedroom
          </span>
          <span className="spot-detail-others">
            <i className="fas fa-bed"></i>
            {eachSpot.beds} bed
          </span>
          <span className="spot-detail-others">
            <i className="fas fa-bath"></i>
            {eachSpot.bath} bath
          </span>
        </div>
        <div>
          {eachSpot.details}
        </div>
      </div>
      <div className="review-full-container">
        <div className="review-intro">
          { totalReview }
          { renderStars }
        </div>
        {reviewDisp}
        <section className="review-form">
          <ReviewFormContainer spot={eachSpot}/>
        </section>
      </div>
    </section>
  );
};
