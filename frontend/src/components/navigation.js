import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LandingPage from './landingpage';
import Hello from './hello';
import Login  from './login';

const Navigation = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />
    <PrivateRoute path = "/users/hello" component = {Hello} />
    <Route exact path = "/user-dashboard" component = {LandingPage} />
    <Route exact path = "/admin-dashboard" component = {LandingPage} />
    <Route exact path = "/login" component = {Login} />
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