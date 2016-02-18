import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Show = ({ post }) => {
  return (
    <div>
    <Link to={'/posts'}>Back</Link>
    <br />
    <Link to={'/posts/' + post._id + '/edit'}>Edit</Link>
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
