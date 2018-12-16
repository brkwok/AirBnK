import { connect } from 'react-redux';
import { fetchUser } from '../../actions/session_actions';
import UserShow from './user_show';

const msp = (state, ownProps) => {
  const id = ownProps.match.params.userId;
  const user = state.entities.users[id] || {};
  const reviews = Object.values(state.entities.reviews);
  const spots = state.entities.spots;

  return {
    user,
    userId: id,
    reviews,
    spots
  };
};

const mdp = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId)),
  };
};

export default connect(msp, mdp)(UserShow);
