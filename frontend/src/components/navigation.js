import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LandingPage from './landingpage';
import NewAssessment from './NewForm/NewAssessment';
import NewPatient from './NewForm/NewPatient';
import NewUser from './NewForm/NewUser';
import Landing_List from './AdminLanding';
import Login  from './login';
import Logout  from './logout';
import Register  from './register';
import PatientList from './PatientList';
import PatientChart from './PatientChart';
import AssessmentList from './AssessmentList';
import PatientNotes from './PatientNotes';
import PatientAddMedication from './PatientAddMedication';
import Resources from './Resources';


const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />

    <PrivateRoute exact path = "/user-dashboard" component = {PatientList} />
    <PrivateRoute exact path = "/admin-dashboard" component = {Landing_List} />
    <Route exact path = "/login" component = {Login} />
    <PrivateRoute exact path = "/register" component = {Register} />
    <PrivateRoute exact path = "/AssessmentList" component = {AssessmentList} />
    <Route path = "/login" component = {Login} />
    <PrivateRoute path = "/logout" component = {Logout} />
    <PrivateRoute path = "/users/admin/landing" component = {Landing_List} />
    <PrivateRoute path = "/users/PatientList" component = {PatientList} />
    <PrivateRoute path = "/PatientChart" component = {PatientChart} />
    <PrivateRoute path = "/PatientNotes" component = {PatientNotes} />
    <PrivateRoute path = "/PatientAddMedication" component = {PatientAddMedication} />
    <PrivateRoute path = "/users/newAssessment" component = {NewAssessment} />
    <PrivateRoute path = "/users/newPatient" component = {NewPatient} />
    <PrivateRoute path = "/users/newUser" component = {NewUser} />
    <Route path = "/resources" component = {Resources} />
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