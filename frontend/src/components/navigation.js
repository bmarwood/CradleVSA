import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LandingPage from './landingpage';
import NewAssessment from './NewForm/NewAssessment';
import NewPatient from './NewForm/NewPatient';
import NewUser from './NewForm/NewUser';
import Landing_List from './AdminLanding';
import Login  from './login';
import Register  from './register';
import PatientList from './PatientList';
import PatientChart from './PatientChart';
import AssessmentList from './AssessmentList';


const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />

    <Route exact path = "/user-dashboard" component = {PatientList} />
    <Route exact path = "/admin-dashboard" component = {Landing_List} />
    <Route exact path = "/login" component = {Login} />
    <PrivateRoute exact path = "/register" component = {Register} />
    <Route exact path = "/users/AssessmentList" component = {AssessmentList} />
    <Route path = "/login" component = {Login} />
    <Route path = "/users/admin/landing" component = {Landing_List} />
    <Route path = "/users/PatientList" component = {PatientList} />
    <Route path = "/users/PatientChart" component = {PatientChart} />
    <Route path = "/users/newAssessment" component = {NewAssessment} />
    <Route path = "/users/newPatient" component = {NewPatient} />
    <Route path = "/users/newUser" component = {NewUser} />

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