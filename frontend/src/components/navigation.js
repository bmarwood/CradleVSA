import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './landingpage';
import Hello from './hello';
import Login  from './login';

const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />
    <Route path = "/users/hello" component = {Hello} />
    <Route path = "/login" component = {Login} />
  </Switch>
)

export default Navigation;