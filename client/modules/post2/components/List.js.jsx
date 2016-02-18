import React, { PropTypes } from 'react';

const List = ({ posts }) => {
  return (
    <div>
      <h1>POSTS LIST</h1>
      <ul>
        {posts.map(post =>
          <li key={post._id}>
            {post.title}
            <a> GO
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}

List.propTypes = {
  posts: PropTypes.array.isRequired
  , onClick: PropTypes.func.isRequired
}

export default List
