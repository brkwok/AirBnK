import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import spotsReducer from './spots_reducer';
import bookingsReducer from './bookings_reducer';
import reviewsReducer from './reviews_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  bookings: bookingsReducer,
  reviews: reviewsReducer,
  spots: spotsReducer,
});

export default entitiesReducer;
