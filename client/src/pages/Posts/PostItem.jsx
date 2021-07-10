import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaTimes } from 'react-icons/fa';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../redux/actions/post';
import ReactQuill from 'react-quill';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
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
      <ReactQuill
        modules={{ toolbar: false }}
        className="my-1 quill-post"
        readOnly={true}
        value={text}
      />
      <p className="small-date">Posted on {formatDate(date)}</p>

      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <FaThumbsUp />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <FaThumbsDown />
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
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

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
