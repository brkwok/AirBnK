import { connect } from 'react-redux';
import { fetchUser } from '../../actions/session_actions';
import { deleteReview } from '../../actions/review_actions';
import UserShow from './user_show';

const msp = (state, ownProps) => {
  const id = ownProps.match.params.userId;
  const user = state.entities.users[id] || {};
  const reviews = Object.values(state.entities.reviews);
  const spots = state.entities.spots;
  const currentUserId = state.session.id;
  const photoUrl = user.photoUrl;

  return {
    currentUserId,
    user,
    userId: id,
    reviews,
    spots,
    photoUrl
  };
};

const mdp = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId)),
    deleteReview: reviewId => dispatch(deleteReview(reviewId)),
  };
};

export default connect(msp, mdp)(UserShow);
