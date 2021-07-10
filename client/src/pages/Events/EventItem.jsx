import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addAttend, deleteEvent } from '../../redux/actions/event';

const EventItem = ({
  addAttend,
  deleteEvent,
  auth,
  event: {
    _id,
    name,
    text,
    start,
    end,
    attendees,
    avatar,
    user,
    comments,
    title
  },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <h4>{title}</h4>
      <p className="small-date">
        Starting on {formatDate(start)} and Ending on {formatDate(end)}
      </p>
      <p className="my-1">{text.substring(0, 100)}</p>

      {showActions && (
        <Fragment>
          <button
            onClick={() => addAttend(_id)}
            type="button"
            className="btn btn-light"
          >
            <span>
              {attendees.length > 0 && <span>{attendees.length}</span>}
            </span>
          </button>
          <Link to={`/events/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteEvent(_id)}
              type="button"
              className="btn btn-danger"
            >
              <FaTimes />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

EventItem.defaultProps = {
  showActions: true
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addAttend: PropTypes.func.isRequired,
  removeAttend: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addAttend, deleteEvent })(EventItem);
