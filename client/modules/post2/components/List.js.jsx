import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const List = ({ posts }) => {
  return (
    <div>
      <Link to={'/posts/new'}>CREATE NEW</Link>
      <h1>POSTS LIST</h1>
      <ul>
        {posts.items.map(post =>
          <li key={post._id}>
            {post.title}
            <Link to={'/posts/' + post._id}> View</Link>
            <Link to={'/posts/' + post._id + '/edit'}> Edit</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

List.propTypes = {
  posts: PropTypes.shape({
    items: PropTypes.array.isRequired
  })
}

export default List
