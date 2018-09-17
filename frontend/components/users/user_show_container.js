import { connect } from 'react-redux';
import { fetchUser } from '../../actions/session_actions';
import UserShow from './user_show';

const msp = (state, ownProps) => {

  const id = ownProps.match.params.userId;
  const user = state.entities.users[id] || {};

  return {
    user,
    userId: id
  };
};

const mdp = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId))
  };
};

export default connect(msp, mdp)(UserShow);
