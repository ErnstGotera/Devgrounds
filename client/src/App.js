import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Alert from './components/Alert';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import setAuthToken from './utils/setAuthToken';
import store from './redux/store';
import { loadUser } from './redux/user/user.actions';
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
        <section className="container">
          <Alert />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </section>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
