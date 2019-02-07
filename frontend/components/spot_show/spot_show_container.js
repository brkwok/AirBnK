import { connect } from 'react-redux';
import { compact } from 'lodash';
import { fetchSpot } from '../../actions/spot_actions';
import { fetchUser } from '../../actions/session_actions';
import SpotShow from './spot_show';

const msp = (state, ownProps) => {
  const spotId = ownProps.match.params.spotId;
  const spot = state.entities.spots[spotId] || {};


  let reviews;
  reviews = Object.keys(state.entities.reviews).map(id => {
    if (state.entities.reviews[parseInt(id)].spot_id === parseInt(spotId)) {

      return state.entities.reviews[parseInt(id)];
    }
  });

  return {
    spotId,
    spot,
    users: state.entities.users,
    reviews: _.compact(reviews),
  };
};

const mdp = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id)),
    fetchSpot: id => dispatch(fetchSpot(id)),
  };
};

export default connect(msp,mdp)(SpotShow);
