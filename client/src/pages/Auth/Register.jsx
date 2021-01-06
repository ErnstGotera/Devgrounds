import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { setAlert } from '../../redux/actions/alert';
import { register } from '../../redux/actions/auth';
import PropTypes from 'prop-types';

import './Register.scss';

const Register = ({ setAlert, register, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className=" lead">
        <FaUser className="icon" /> Create Your Account
      </p>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirm: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          const { name, email, password, confirm } = values;

          if (password !== confirm) {
            setAlert('Passwords do not match', 'danger');
          } else {
            try {
              register({ name, email, password });

              setTimeout(() => {
                setSubmitting(false);
              }, 1000);
            } catch (err) {
              console.error(err);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <Field type="text" placeholder="Name" name="name" required />
            </div>
            <div className="form-group">
              <Field type="email" placeholder="Email" name="email" required />
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
            <div className="form-group">
              <Field
                type="password"
                placeholder="Confirm Password"
                name="confirm"
                minLength="6"
                required
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>

      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
