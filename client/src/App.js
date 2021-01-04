import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import Routes from './components/routing/Routes';
import setAuthToken from './utils/setAuthToken';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
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
