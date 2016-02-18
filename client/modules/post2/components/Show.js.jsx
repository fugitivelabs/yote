import React, { PropTypes } from 'react';

const Show = ({ post }) => {
  return (
    <div>
      <h1>POSTS SHOW</h1>
      <p>{post.title}</p>
      <p>{post.content}</p>
    </div>
  )
}

Show.propTypes = {
  post: PropTypes.object.isRequired
}

export default Show
