import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveCurrentUser = currentUser => {

  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveUser = payload => {

  return {
    type: RECEIVE_USER,
    user: payload.user,
    reviews: payload.reviews,
    spots: payload.spots
  };
};

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const signup = user => {
  return dispatch => {
    return SessionApiUtil.signup(user).then(
      user => dispatch(receiveCurrentUser(user)),
      errors => {
      return dispatch(receiveErrors(errors.responseJSON));
    });
  };
};

export const fetchUser = userId => {
  return dispatch => {
    return SessionApiUtil.fetchUser(userId).then(
      user => dispatch(receiveUser(user))
    );
  };
};

export const updateUser = user => {
  return dispatch => {
    return SessionApiUtil.updateUser(user).then(
      user => dispatch(receiveCurrentUser(user)),
      errors => {
        return dispatch(receiveErrors(errors.responseJSON));
      }
    );
  };
};

export const login = user => {
  return dispatch => {
    return SessionApiUtil.login(user).then(
      user => {

        return dispatch(receiveCurrentUser(user)); },
      errors => {
      return dispatch(receiveErrors(errors.responseJSON));
    });
  };
};

export const logout = () => {
  return dispatch => {
    return SessionApiUtil.logout().then(
      () => dispatch(logoutCurrentUser())
    );
  };
};
