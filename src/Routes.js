import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Session from './pages/Session';

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <PrivateRoute path='/' component={Session} />
      </Switch>
    </BrowserRouter>
  );
}