import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/user/user.actions';

import './Register.scss';

const Login = ({ login, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className=" lead">
        <FaUser className="icon" /> Sign Into Your Account
      </p>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          const { email, password } = values;
          console.log(values, email, password);
          login(email, password);
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <Field type="email" placeholder="email" name="email" required />
            </div>

            <div className="form-group">
              <Field
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                required
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>

      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

login.PropTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
