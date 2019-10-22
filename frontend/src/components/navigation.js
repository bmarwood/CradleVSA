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

    <Route exact path = "/user-dashboard" component = {PatientList} />
    <AdminRoute exact path = "/admin-dashboard" component = {Landing_List} />
    <Route exact path = "/login" component = {Login} />
    <AdminRoute exact path = "/register" component = {Register} />
    <PrivateRoute exact path = "/AssessmentList" component = {AssessmentList} />
    <Route path = "/login" component = {Login} />
    <Route path = "/logout" component = {Logout} />
    <AdminRoute path = "/users/admin/landing" component = {Landing_List} />
    <WorkerRoute path = "/users/PatientList" component = {PatientList} />
    <WorkerRoute path = "/PatientChart" component = {PatientChart} />
    <WorkerRoute path = "/PatientNotes" component = {PatientNotes} />
    <WorkerRoute path = "/PatientAddMedication" component = {PatientAddMedication} />
    <WorkerRoute path = "/users/newAssessment" component = {NewAssessment} />
    <WorkerRoute path = "/users/newPatient" component = {NewPatient} />
    <AdminRoute path = "/users/newUser" component = {NewUser} />
    <Route path = "/resources" component = {Resources} />
  </Switch>
)

function getRoles() {
  var roleArray = []
  var user = localStorage.getItem("userData")
  var parsedUser = JSON.parse(user)
  parsedUser.roles.forEach( function(role) {
      console.log("User data is : " + role.role)
      roleArray.push(role.role)
  })

  return roleArray
}

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

//TODO: Need to create a page for unauth access.
function WorkerRoute ({component: Component, authed, ...rest}) {

  var roles = getRoles()

  return (
    <Route {...rest} render={(props) => (
      localStorage.getItem('isLoggedIn') === 'true' && (roles.indexOf("HEALTH_WORKER") > -1 || roles.indexOf("ADMIN") > -1)
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
    )} />
    
  )
}

//TODO: Need to create a redirect page for unauth access.
function AdminRoute ({component: Component, authed, ...rest}) {

  var roles = getRoles()

  return (
    <Route {...rest} render={(props) => (
      localStorage.getItem('isLoggedIn') === 'true' &&  roles.indexOf("ADMIN") > -1
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
    )} />
    
  )
}



export default Navigation;