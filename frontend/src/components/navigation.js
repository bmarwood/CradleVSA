import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './landingpage';
import Hello from './hello';
import PatientList from './PatientList';

const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />
    <Route path = "/users/hello" component = {Hello} />
    <Route path = "/users/PatientList" component = {PatientList} />
  </Switch>
)

export default Navigation;