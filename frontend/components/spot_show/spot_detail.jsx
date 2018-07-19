import React from 'react';
import { Link } from 'react-router-dom';

export default ({ spot, user }) => {
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
    </section>
  );
};
