import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Base from "../../../global/components/BaseComponent.js.jsx";
import { REQUEST_ALL_POSTS, RECEIVE_ALL_POSTS } from '../postActions'
import ListPosts from './ListPosts.js.jsx'

// class ListPostsContainer extends Base{
//   constructor(props) {
//     super(props)
//     //handlers
//   }
//
//   componentWillMount() {
//     dispatch(fetchAllPosts())
//   }
//
//   render() {
//     return (
//       <div>
//         {this.props.children}
//       </div>
//     )
//   }
//
//
// }
//
// ListPostsContainer.propTypes = {
//   posts: PropTypes.array.isRequired
// }

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.list.items
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPostsClick: (id) => {
      console.log("click")
    }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ListPostsContainer)

const ListPostsContainer = connect(
  mapStateToProps
  , mapDispatchToProps
)(ListPosts)

export default ListPostsContainer
