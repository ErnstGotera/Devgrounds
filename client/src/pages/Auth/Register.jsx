import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { setAlert } from '../../redux/alert/alert.actions';
import { register } from '../../redux/user/user.actions';
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
        validate={values => {
          const errors = {};

          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const { name, email, password, confirm } = values;

          if (password !== confirm) {
            setAlert('Passwords do not match', 'danger');
          } else {
            try {
              setSubmitting(true);
              register({ name, email, password });

              setTimeout(() => {
                setSubmitting(false);
              }, 1000);
            } catch (err) {
              console.error(err.response.data);
            }
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="form">
            <pre>{JSON.stringify(values, null, 2)}</pre>;
            <div className="form-group">
              <Field type="text" placeholder="Name" name="name" required />
            </div>
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
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
