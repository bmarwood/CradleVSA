import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './landingpage';
import Hello from './hello';
import PatientList from './PatientList';
import Test from './test';

const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />
    <Route path = "/users/hello" component = {Hello} />
    <Route path = "/users/PatientList" component = {PatientList} />
    <Route path = "/users/test" component = {Test} />

  </Switch>
)

export default Navigation;