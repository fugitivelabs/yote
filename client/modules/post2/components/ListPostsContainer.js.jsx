import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Base from "../../../global/components/BaseComponent.js.jsx";
import { fetchAllPosts } from '../postActions'
import List from './List.js.jsx'

class ListPostsContainer extends Base{
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchAllPosts())
  }

  render() {
    return (
      <div>
        <List posts={this.props.posts} />
      </div>
    )
  }

}

ListPostsContainer.propTypes = {
  posts: PropTypes.array.isRequired
  , dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    posts: state.posts.list.items
  }
}

//TODO: this doesnt work
// const mapDispatchToProps = (dispatch, ownProps) => {
//   // console.log(dispatch);
//   return {
//     , fetch: () => {
//       dispatch(fetchAllPosts());
//     }
//
//     // routerActions: bindActionCreators({pushState}, dispatch)
//   }
// }

export default connect(mapStateToProps)(ListPostsContainer)
