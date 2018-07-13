import { connect } from 'react-redux';
import Search from './search';
import { fetchSpots } from '../../actions/spot_actions';

const msp = (state) => {
  return {
    spots: Object.values(state.entities.spots)
  };
};

const mdp = dispatch => {
  return {
    fetchSpots: () => dispatch(fetchSpots())
  };
};

export default connect(msp, mdp)(Search);
