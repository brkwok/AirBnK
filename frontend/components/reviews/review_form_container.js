import { connect } from 'react-redux';
import ReviewForm from './review_form';
import { openModal } from '../../actions/modal_actions';
import { createReview } from '../../actions/review_actions';

const msp = (state) => {
  return {
    currentUserId: state.session.id,
    errors: state.errors.review,
  };
};

const mdp = dispatch => {
  return {
    createReview: (data) => dispatch(createReview(data)),
    openModal: (modal) => dispatch(openModal(modal))
  };
};

export default connect(msp, mdp)(ReviewForm);
