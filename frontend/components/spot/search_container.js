import { connect } from 'react-redux';
import Search from './search';
import { fetchSpots } from '../../actions/spot_actions';
import { updateBounds } from '../../actions/filter_actions';

const msp = (state, ownProps) => {
  const spots = Object.values(state.entities.spots);
  const lat = parseFloat(ownProps.location.search.split("&")[0].split("=")[1]);
  const lng = parseFloat(ownProps.location.search.split("&")[1].split("=")[1]);
  return {
    spots,
    bounds: state.ui.filters.bounds,
    lat,
    lng
  };
};

const mdp = dispatch => {
  return {
    updateBounds: (bounds) => dispatch(updateBounds(bounds)),
    fetchSpots: (bounds) => dispatch(fetchSpots(bounds))
  };
};

export default connect(msp, mdp)(Search);
