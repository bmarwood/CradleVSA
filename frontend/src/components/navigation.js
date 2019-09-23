import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './landingpage';
import Hello from './hello';

const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />
    <Route path = "/users/hello" component = {Hello} />
  </Switch>
)

export default Navigation;