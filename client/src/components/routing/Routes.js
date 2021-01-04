import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../../pages/Auth/Register';
import Login from '../../pages/Auth/Login';
import Alert from '../Alert';
import Dashboard from '../../pages/Dashboard/DashBoard';
import PrivateRoute from './PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;
