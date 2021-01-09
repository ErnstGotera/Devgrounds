import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage/HomePage';
import Routes from './components/routing/Routes';
import setAuthToken from './utils/setAuthToken';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';
import { LOGOUT } from './redux/actions/types';
import './App.css';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={Routes} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
