import { connect } from 'react-redux';
import { compact } from 'lodash';
import { fetchSpot } from '../../actions/spot_actions';
import SpotShow from './spot_show';

const msp = (state, ownProps) => {
  const spotId = ownProps.match.params.spotId;
  const spot = state.entities.spots[spotId] || {};
  const user = spot.host || {};
  let reviews;
  if (typeof Object.keys(state.entities.reviews) !== 'undefined') {
    reviews = Object.keys(state.entities.reviews).map(id => {
      if (state.entities.reviews[parseInt(id)].spot_id === parseInt(spotId)) {

        return state.entities.reviews[parseInt(id)];
      }
    });
  }
  // reviews = _.compact(reviews);

  return {
    spotId,
    spot,
    user,
    users: state.entities.users,
    reviews: _.compact(reviews),
  };
};

const mdp = dispatch => {
  return {
    fetchSpot: id => dispatch(fetchSpot(id)),
  };
};

export default connect(msp,mdp)(SpotShow);
