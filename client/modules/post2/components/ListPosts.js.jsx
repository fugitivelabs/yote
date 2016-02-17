import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";

const ListPosts = ({ posts }) => {
  return (
    <div>
      <h1>POSTS LIST</h1>
      <ul>
        {posts.map(post =>
          <li key={post._id}>{post.title}</li>
        )}
      </ul>
    </div>
  )
}
// // EQUIVALENT:
// class ListPosts extends Base{
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return(
//       <div>
//         <h1>POSTS LIST</h1>
//         <ul>
//           {this.props.posts.map(post =>
//             <li key={post._id}>{post.title}</li>
//           )}
//         </ul>
//       </div>
//     )
//   }
// }

ListPosts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default ListPosts
