import { connect } from 'react-redux';

import { fetchSpot } from '../../actions/spot_actions';
import SpotShow from './spot_show';

const msp = (state, ownProps) => {
  const spotId = ownProps.match.params.spotId;
  const spot = state.entities.spots[spotId];

  return {
    spotId,
    spot
  };
};

const mdp = dispatch => {
  return {
    fetchSpot: id => dispatch(fetchSpot(id))
  };
};

export default connect(msp,mdp)(SpotShow);
