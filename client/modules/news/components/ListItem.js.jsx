import React, { PropTypes } from 'react'

const ListItem = ({ post }) => {

  return (
    <li>
      <a href="#"
      >
        {post.title}
      </a>
    </li>
  )
}

ListItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default ListItem;
