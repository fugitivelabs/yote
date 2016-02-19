import React, { PropTypes } from 'react'
import { Link } from 'react-router';

const PostListItem = ({ post }) => {

  return (
    <li>

      <Link to={`/posts/${post.slug}`}> {post.title}</Link>

    </li>
  )
}

PostListItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostListItem;
