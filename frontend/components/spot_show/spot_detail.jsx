import React from 'react';
import { Link } from 'react-router-dom';

export default ({ spot, user, spotId }) => {
  let eachSpot = spot || {};
  let link = '';
  if (typeof user === 'undefined') {} else { link = (
      <Link to="">
        <img  className="user-profile-pic" src={user.img_url} />
      </Link>
    );
  }
  let name = '';
  if (typeof user === 'undefined') {
  } else {
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
      <div className="spot-configs">other spot details</div>
    </section>
  );
};
