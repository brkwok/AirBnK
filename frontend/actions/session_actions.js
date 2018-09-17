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

export const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
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
      err => {
      return dispatch(receiveErrors(err.responseJSON));
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
      err => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    );
  };
};

export const login = user => {
  return dispatch => {
    return SessionApiUtil.login(user).then(
      user => dispatch(receiveCurrentUser(user)), err => {
      return dispatch(receiveErrors(err.responseJSON));
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
