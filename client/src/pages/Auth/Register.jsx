import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setAlert } from '../../redux/actions/alert';
import { registerUser } from '../../redux/actions/auth';
import PropTypes from 'prop-types';

import './Register.scss';

const Register = ({ setAlert, registerUser, isAuthenticated }) => {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  const onSubmit = data => {
    setSubmitting(true);
    const { name, email, password, confirm } = data;

    if (password !== confirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      try {
        registerUser({ name, email, password });
        setTimeout(() => {
          setSubmitting(false);
        }, 1000);
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className=" lead">
        <FaUser className="icon" /> Create Your Account
      </p>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            {...register('name')}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
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
        <div className="form-group">
          <input
            {...register('confirm')}
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            minLength="6"
            required
          />
        </div>
        <button disabled={submitting} className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
