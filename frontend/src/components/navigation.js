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
import Profile from './User/Profile'


const Navigation = () => (
  <Switch>
    {/* Home Direction */}
    <Route exact path = "/" component = {LandingPage} />
    
    {/* User Directions */}
    <Route exact path = "/user-dashboard" component = {PatientList} />
    <Route path = "/users/PatientList" component = {PatientList} />
    <Route path = "/PatientChart" component = {PatientChart} />
    <Route path = "/PatientNotes" component = {PatientNotes} />
    <Route path = "/PatientAddMedication" component = {PatientAddMedication} />
    <Route path = "/users/newAssessment" component = {NewAssessment} />
    <Route path = "/users/newPatient" component = {NewPatient} />
    <Route path = "/users/newUser" component = {NewUser} />
    <Route path = "/resources" component = {Resources} />
    <PrivateRoute path = "/users/profile" component = {Profile} />

    {/* Login/Logout Directions */}
    <Route exact path = "/login" component = {Login} />
    <Route path = "/logout" component = {Logout} />
    <Route exact path = "/users/AssessmentList" component = {AssessmentList} />
  

    {/* Admin Related Directions */}
    <Route exact path = "/admin-dashboard" component = {Landing_List} />
    <PrivateRoute exact path = "/register" component = {Register} />
    <Route path = "/users/admin/landing" component = {Landing_List} />
    
    {/* <Route path = "/login" component = {Login} /> */}
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