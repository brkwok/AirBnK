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
<<<<<<< HEAD

    const reviews = this.state.reviews.map( (review) => {
=======
    const reviews = this.props.reviews;

    const reviewsDiv = reviews.map( (review) => {
>>>>>>> c0d9fcf0d3d040df16273015986a40cc98129b5f
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
<<<<<<< HEAD
          {reviews}
=======
          {reviewsDiv}
>>>>>>> c0d9fcf0d3d040df16273015986a40cc98129b5f
        </div>
      </section>
    );
  }
}

export default UserShow;
