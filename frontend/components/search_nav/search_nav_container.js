import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import SearchNav from './search_nav';
import { openModal } from '../../actions/modal_actions';
import { fetchBookings } from '../../actions/booking_actions';

const msp = ({ session, entities: { users }}, ownProps) => {
  return {
    currentUser: users[session.id],
    history: ownProps.history
  };
};

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal)),
});

export default connect(msp, mdp)(SearchNav);
