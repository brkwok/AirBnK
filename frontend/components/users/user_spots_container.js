import { connect } from 'react-redux';
import { fetchSpots } from '../../actions/spot_actions';
import UserSpots from './user_spots';

const msp = (state) => {
  const spots = state.entities.spots || {};
  const reviews = state.entities.reviews || {};

  return {
    spots,
  };
};

const mdp = dispatch => ({
  fetchSpots: () => dispatch(fetchSpots())
});

export default connect(msp, mdp)(UserSpots);
