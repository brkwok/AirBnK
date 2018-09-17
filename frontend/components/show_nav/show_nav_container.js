import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import ShowNav from './show_nav';
import { openModal } from '../../actions/modal_actions';

const msp = ({ session, entities: { users }}, ownProps) => {
  return {
    currentUser: users[session.id],
    history: ownProps.history
  };
};

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal))
});

export default connect(msp, mdp)(ShowNav);
