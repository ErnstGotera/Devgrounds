import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Auth/Register';
import './App.css';

const App = () => (
  <Switch>
    <Fragment className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={Register} />
        <Route exact path="/login" component={HomePage} />
      </Switch>
      <Footer />
    </Fragment>
  </Switch>
);

export default App;
