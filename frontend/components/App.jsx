import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import SearchNavContainer from './search_nav/search_nav_container';
import { Route, Link } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import Modal from './modal/modal';
import SearchContainer from './spot/search_container';
import SpotShowContainer from './spot_show/spot_show_container';
import ShowNavContainer from './show_nav/show_nav_container';

const App = () => {
  return (
    <div>
      <Modal />
      <div >
        <Route exact path="/" component= { GreetingContainer } />
        <Route exact path="/spots" component={ SearchNavContainer }/>
      </div>

      <Route exact path="/spots" component={ SearchContainer } />
      <Route path="/spots/:spotId" component={ ShowNavContainer } />
      <Route path="/spots/:spotId" component={ SpotShowContainer } />

    </div>
  );
};

export default App;
