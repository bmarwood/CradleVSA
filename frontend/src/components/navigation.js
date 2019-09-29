import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LandingPage from './landingpage';
import Landing_List from './AdminLanding';
import Assessments from './assessments';
import Login  from './login';
import PatientList from './PatientList';
import PatientChart from './PatientChart';


const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />
    <PrivateRoute path = "/users/hello" component = {Hello} />
    <Route exact path = "/user-dashboard" component = {PatientList} />
    <Route exact path = "/admin-dashboard" component = {Landing_List} />
    <Route exact path = "/login" component = {Login} />
    <Route exact path = "/assessments/all" component = {Assessments} />
    <Route path = "/login" component = {Login} />
    <Route path = "/users/admin/landing" component = {Landing_List} />
    <Route path = "/users/PatientList" component = {PatientList} />
    <Route path = "/users/PatientChart" component = {PatientChart} />

  </Switch>
)


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route {...rest} render={(props) => (
      localStorage.getItem('isLoggedIn') === 'true'
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )
}


export default Navigation;