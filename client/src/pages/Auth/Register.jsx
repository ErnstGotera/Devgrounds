import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import './Register.scss';

const Register = () => {
  return (
    <section className="container">
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
          const newUser = {
            name,
            email,
            password
          };
          if (password !== confirm) {
            setSubmitting(true);
            console.log('Passwords dont match');
            setTimeout(() => {
              setSubmitting(false);
            }, 9100);
          } else {
            try {
              setSubmitting(true);
              // const body = JSON.stringify(newUser);
              // const res = await axios.post('/api/users', body);
              // console.log(res.data);
              console.log(newUser);
              setTimeout(() => {
                setSubmitting(false);
              }, 400);
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
    </section>
  );
};

export default Register;
