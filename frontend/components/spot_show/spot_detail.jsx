import React from 'react';
import { Link } from 'react-router-dom';
import ReviewFormContainer from '../reviews/review_form_container';
import ReviewList from '../reviews/review_list';


export default ({ spot, user, reviews, users }) => {
  let eachSpot = spot || {};
  let link = '';
  if (typeof user === 'undefined') { return; } else { link = (
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
  if (reviews.length === 0) {
  } else {
    reviewDisp = reviews.sort((review1, review2) => {
      const date1 = new Date(review1.created_at);
      const date2 = new Date(review2.created_at);
      return date2 - date1;
    }).map(review => {


      return (
        <div key={review.id} className="">
          <div>
            <img src={users[review.user_id].img_url}></img>
            <div>{users[review.user_id].name}</div>
            <div>{new Date(review.created_at).toString().split("GMT")[0]}</div>
          </div>
          <div>{review.comment}</div>
        </div>
      );
    });
  }

  return(
    <section className="spot-header">
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
      {reviewDisp}
      <section className="review-form">
        <ReviewFormContainer spot={eachSpot}/>
      </section>
    </section>
  );
};
