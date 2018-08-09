import React from 'react';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: null,
      rating: 1,
    };

    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    } else {
      this.props.openModal('login');
    }
  }

  renderErrors() {
    let reviewErrors = this.props.errors || [];

    return(
      <ul>
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

  render() {
    return (
      <div className="review-form-wrap">
        {this.renderErrors()}
        <form className="review-form-container" onSubmit={this.handleSubmit}>
          <textarea className="review-review" onChange={this.updateField('comment')} placeholder="Your review about the place"></textarea>
          <button className="review-submit" type="submit">Post Review</button>
        </form>
      </div>
    );
  }
}

export default ReviewForm;
