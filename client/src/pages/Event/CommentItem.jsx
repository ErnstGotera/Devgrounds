import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../redux/actions/event';
import { FaTimes } from 'react-icons/fa';

const CommentItem = ({
  eventId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="small-date">Posted on {formatDate(date)}</p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteComment(eventId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <FaTimes />
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  eventId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
