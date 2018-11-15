import React from 'react';

class UserShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 9,
      reviews: this.props.reviews,
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }

  render() {
    const user = this.props.user;

    const reviews = this.props.reviews.map( (review) => {
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
          <div className="user-show-review-header">Reviews</div>
          {reviews}
        </div>
      </section>
    );
  }
}

export default UserShow;
