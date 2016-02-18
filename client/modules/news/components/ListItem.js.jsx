import React, { PropTypes } from 'react'
import { Router, Link } from 'react-router';

const ListItem = ({ post }) => {

  return (
    <li>

      <Link to={`/news/${post.slug}`}> {post.title}</Link>

    </li>
  )
}

ListItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default ListItem;
