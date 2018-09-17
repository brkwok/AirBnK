import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../actions/modal_actions';

const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to='/'/>
      )
    )}/>
);


const msp = state => {
  return {loggedIn: Boolean(state.session.id)};
};

const mdp = dispatch => ({
  openModal: (modal) => dispatch(openModal(modal))
});

export const AuthRoute = withRouter(connect(msp, mdp)(Auth));
