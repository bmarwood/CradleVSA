import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './landingpage';
import Hello from './hello';
import Form from './patient/main';
import Patient from './patient/Patient';
import Symptoms from './patient/Symptoms';
import Vital from './patient/Vitals';

const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />
    <Route path = "/form" component = {Form} />
    <Route path = "/users/hello" component = {Hello} />
    <Route path = "/patient" component = {Patient} />
    <Route path = "/symptoms" component = {Symptoms}/>
    <Route path = "/vital" component = {Vital}/>
  </Switch>
)

export default Navigation;