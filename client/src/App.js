import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Alert from './components/Alert';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import './App.css';

const App = () => (
  <>
    <Navbar />

    <Switch>
      <Route exact path="/" component={HomePage} />
      <section className="container">
        <Alert />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </section>
    </Switch>
    <Footer />
  </>
);

export default App;
