import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventItem from './EventItem';
import EventForm from './EventForm';
import { getEvents } from '../../redux/actions/event';
import { FaUser } from 'react-icons/fa';

const Events = ({ getEvents, event: { events } }) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const filteredEvents = events.filter(
    event =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Fragment>
      <h1 className="large text-primary">Events</h1>
      <p className="lead">
        <FaUser /> Welcome to the community
      </p>
      <EventForm />
      <input
        onChange={e => setSearch(e.target.value)}
        type="search"
        placeholder="Search events"
        className="search-bar"
      />
      <div className="posts">
        {filteredEvents.map(event => (
          <EventItem key={event._id} event={event} />
        ))}
      </div>
    </Fragment>
  );
};

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvents })(Events);
