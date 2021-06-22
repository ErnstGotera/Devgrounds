import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/actions/auth';

import './Register.scss';

const Login = ({ login, isAuthenticated }) => {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  const onSubmit = data => {
    setSubmitting(true);
    const { email, password } = data;
    login(email.toLowerCase(), password);
    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className=" lead">
        <FaUser className="icon" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            {...register('email')}
            type="email"
            placeholder="email"
            name="email"
            required
          />
        </div>

        <div className="form-group">
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
          />
        </div>

        <button disabled={submitting} className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
