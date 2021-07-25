import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../../pages/Auth/Register';
import Login from '../../pages/Auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../../pages/Dashboard/DashBoard';
import Profile from '../../pages/Profile/Profile';
import Profiles from '../../pages/Profiles/Profiles';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import PrivateRoute from './PrivateRoute';
import Posts from '../../pages/Posts/Posts';
import Post from '../../pages/Post/Post';
import Events from '../../pages/Events/Events';
import Event from '../../pages/Event/Event';
import Join from '../../pages/Join/Join';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/events" component={Events} />
        <PrivateRoute exact path="/events/:id" component={Event} />
        <PrivateRoute exact path="/join" component={Join} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
