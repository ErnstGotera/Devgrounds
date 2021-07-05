import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../redux/actions/post';
import { FaUser } from 'react-icons/fa';

const Posts = ({ getPosts, post: { posts } }) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const filteredPosts = posts.filter(
    post =>
      post.name.toLowerCase().includes(search.toLowerCase()) ||
      post.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <FaUser /> Welcome to the community
      </p>
      <PostForm />
      <input
        onChange={e => setSearch(e.target.value)}
        type="search"
        placeholder="Search posts"
        className="search-bar"
      />
      <div className="posts">
        {filteredPosts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
