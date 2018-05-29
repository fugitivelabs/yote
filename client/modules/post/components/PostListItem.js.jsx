// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import post css modules
import postStyles from '../postModuleStyles.css';
import moment from 'moment';

function PostListItem({ post }) {
  return (
    <li styleName="list-item">
      <Link className="post-title" to={`/posts/${post._id}`}> {post.title}</Link>
      <p> By: <Link to={`/users/${post._author._id}`}> {post._author.firstName} {post._author.lastName}</Link></p>
      <p><em>{moment(post.created).calendar()}</em></p>
    </li>
  )
}

PostListItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostListItem;
