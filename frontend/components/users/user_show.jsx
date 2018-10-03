import React from 'react';

class UserShow extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }

  render() {
    const user = this.props.user;
    const reviews = this.props.reviews;

    const reviewsDiv = reviews.map( (review) => {
      return(
        <div className='user-show-review' key={review.id}>
          <div>{review.comment}</div>
        </div>
      );
    });

    return(
      <section className="user-show">
        <div className="user-show-header">
          <div className="user-show-profile-pic-container">
            <img className="user-show-profile-pic"  src={user.img_url} />
          </div>
          <div className="user-show-username"><span>Hey, I'm </span>{user.name}!</div>
        </div>
        <div>
          <div>Reviews</div>
          {reviewsDiv}
        </div>
      </section>
    );
  }
}

export default UserShow;
