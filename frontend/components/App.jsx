import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import SearchNavContainer from './search_nav/search_nav_container';
import { Route, Link } from 'react-router-dom';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import { AuthRoute } from '../util/route_util';
import Modal from './modal/modal';
import SearchContainer from './spot/search_container';

const App = () => {
  return (
    <div>
      <Modal />
      <div >
        <Route exact path="/" component= { GreetingContainer } />
      </div>

      <Route exact path="/spots" component={ SearchNavContainer }/>
      <Route exact path="/spots" component={ SearchContainer } />
    </div>
  );
};

export default App;
