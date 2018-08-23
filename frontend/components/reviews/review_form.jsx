import React from 'react';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: null,
      rating: null,
      tempRating: null
    };

    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayStars = this.displayStars.bind(this);
    this.rate = this.rate.bind(this);
    this.starOver = this.starOver.bind(this);
    this.starOut = this.starOut.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (typeof this.props.currentUserId === 'number') {
      this.props.createReview({
        review: {
          comment: this.state.comment,
          spot_id: this.props.spot.id,
          user_id: this.props.currentUserId,
          rating: this.state.rating
        }
      });
      this.setState({ comment: null, rating: null });
      let text = document.getElementById("textarea");
      text.value = '';
    } else {
      this.props.openModal('login');
    }
  }

  renderErrors() {
    let reviewErrors = this.props.errors || [];

    return(
      <ul className="review-error">
        {reviewErrors.map( (err, i) => {
          return <li key={`error${i}`} className="review-errors">
            {err}
          </li>;
        })}
      </ul>
    );
  }

  updateField(field) {
    return (e) => {
      this.setState({ [field]: e.target.value});
    };
  }

  displayStars() {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      let type;

      if (this.state.rating > i && this.state.rating !== null) {
        type = 'fas fa-star rating-button';
      } else {
        type = 'far fa-star rating-button';
      }

      stars.push(
        <i
          key={`${i}`}
          ref={`${i}`}
          className={type}
          onMouseEnter={(e) => this.starOver(e, i)}
          onMouseOut={this.starOut}
          onClick={(e) => this.rate(e, i)}
          >
        </i>);
    }

    return stars;
  }

  starOver(e, i) {

    let stars = Object.values(this.refs);
    for (let idx = 0; idx < 5; idx++) {
      if (idx <= i) {
        stars[idx].className = 'fas fa-star rating-button';
      } else {
        stars[idx].className = 'far fa-star rating-button';
      }
    }
  }

  starOut() {
    let stars = Object.values(this.refs);
    let curRating = this.state.rating;

    for (let i = 0; i < 5; i++) {
      if (curRating > i) {
        stars[i].className = 'fas fa-star rating-button';
      } else {
        stars[i].className = 'far fa-star rating-button';
      }
    }
  }

  rate(e, rating) {
    let rate = rating + 1;
    this.setState({
      rating: rate
    });
  }

  render() {
    return (
      <div className="review-form-wrap">
        {this.renderErrors()}
        <div>
          {this.displayStars()}
        </div>
        <form className="review-form-container" onSubmit={this.handleSubmit}>
          <textarea id="textarea" className="review-review" onChange={this.updateField('comment')} placeholder="Your review about the place"></textarea>
          <button className="review-submit" type="submit">Post Review</button>
        </form>
      </div>
    );
  }
}

export default ReviewForm;
