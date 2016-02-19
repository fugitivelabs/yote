import React, { PropTypes } from 'react'
import { Link } from 'react-router';

const ListItem = ({ post }) => {

  return (
    <li>

      <Link to={`/posts/${post.slug}`}> {post.title}</Link>

    </li>
  )
}

ListItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default ListItem;
