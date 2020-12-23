import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

const App = () => (
  <Switch>
    <Fragment className="App">
      <Navbar />
      <Route exact path="/" component={HomePage} />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={HomePage} />
          <Route exact path="/login" component={HomePage} />
        </Switch>
      </section>
    </Fragment>
  </Switch>
);

export default App;
