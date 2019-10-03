import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LandingPage from './landingpage';
import Form from './Assessment/NewAssessment';
import Landing_List from './AdminLanding';
import Login  from './login';
import Register  from './register';
import PatientList from './PatientList';
import PatientChart from './PatientChart';
import AssessmentList from './AssessmentList';


const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />

    {/* <Route path = "/users/form" component = {Form} /> */}

    {/* <PrivateRoute path = "/users/hello" component = {Hello} /> */}
    <Route exact path = "/user-dashboard" component = {PatientList} />
    <Route exact path = "/admin-dashboard" component = {Landing_List} />
    <Route exact path = "/login" component = {Login} />
    <PrivateRoute exact path = "/register" component = {Register} />
    <Route exact path = "/users/AssessmentList" component = {AssessmentList} />
    <Route path = "/login" component = {Login} />
    <Route path = "/users/admin/landing" component = {Landing_List} />
    <Route exact path = "/users/PatientList" component = {PatientList} />
    <Route exact path = "/PatientChart" component = {PatientChart} />
    <Route path = "/users/form" component = {Form} />

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