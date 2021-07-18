import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEvent } from '../../redux/actions/event';

const EventForm = ({ addEvent }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    const { title, text, start, end } = data;
    addEvent({ title, text, start, end });
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Create your Event</h3>
      </div>

      <form className="form my-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            {...register('title', { required: true })}
            type="text"
            placeholder="Event name"
          />
        </div>
        <div className="form-group">
          <h4>Start Date</h4>
          <input {...register('start', { required: true })} type="date" />
        </div>
        <div className="form-group">
          <h4>End Date</h4>
          <input {...register('end', { required: true })} type="date" />
        </div>

        <textarea
          {...register('text', { required: true })}
          cols="30"
          rows="5"
          placeholder="Event description"
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired
};

export default connect(null, { addEvent })(EventForm);
