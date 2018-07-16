import { connect } from 'react-redux';
import Search from './search';
import { fetchSpots } from '../../actions/spot_actions';
import { updateBounds } from '../../actions/filter_actions';

const msp = (state) => {
  return {
    spots: Object.values(state.entities.spots),
    bounds: state.ui.filters.bounds
  };
};

const mdp = dispatch => {
  return {
    updateBounds: (bounds) => dispatch(updateBounds(bounds)),
    fetchSpots: (bounds) => dispatch(fetchSpots(bounds))
  };
};

export default connect(msp, mdp)(Search);
