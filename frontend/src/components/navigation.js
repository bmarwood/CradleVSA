import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './landingpage';
import Hello from './hello';
import Landing_List from './AdminLanding';

const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />
    <Route path = "/users/hello" component = {Hello} />
    <Route path = "/users/admin/landing" component = {Landing_List} />
  </Switch>
)

export default Navigation;