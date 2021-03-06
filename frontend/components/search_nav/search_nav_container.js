import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import SearchNav from './search_nav';
import { openModal } from '../../actions/modal_actions';
import { fetchUser } from '../../actions/session_actions';

const msp = ({ session, entities: { users }}, ownProps) => {
  return {
    currentUser: users[session.id],
    history: ownProps.history
  };
};

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal)),
  fetchUser: id => dispatch(fetchUser(id)),
});

export default connect(msp, mdp)(SearchNav);
