import { connect } from 'react-redux';
import { compact } from 'lodash';
import { fetchSpot } from '../../actions/spot_actions';
import { fetchUser } from '../../actions/session_actions';
import { fetchReviews } from '../../actions/review_actions';
import SpotShow from './spot_show';

const msp = (state, ownProps) => {

  const spotId = ownProps.match.params.spotId;
  const spot = state.entities.spots[spotId] || {};
  const users = state.entities.users;
  const host = spot.host || {};
  let user

  if (Object.values(host).length !== 0) {
    user = state.entities.users[host.id];
  }

  let reviews;
  reviews = Object.keys(state.entities.reviews).map(id => {
    if (state.entities.reviews[parseInt(id)].spot_id === parseInt(spotId)) {

      return state.entities.reviews[parseInt(id)];
    }
  });

  return {
    spotId,
    spot,
    host,
    users,
    user,
    hosts: state.entities.users,
    reviews: _.compact(reviews),
  };
};

const mdp = dispatch => {
  return {
    fetchReviews: () => dispatch(fetchReviews()),
    fetchUser: id => dispatch(fetchUser(id)),
    fetchSpot: id => dispatch(fetchSpot(id)),
  };
};

export default connect(msp,mdp)(SpotShow);
