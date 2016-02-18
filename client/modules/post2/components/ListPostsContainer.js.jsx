import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Base from "../../../global/components/BaseComponent.js.jsx";
import { fetchAllPosts } from '../postActions'
import ListPosts from './ListPosts.js.jsx'

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
        <ListPosts posts={this.props.posts}/>
      </div>
    )
  }

}

ListPostsContainer.propTypes = {
  posts: PropTypes.array.isRequired
  , dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.list.items
  }
}

export default connect(mapStateToProps)(ListPostsContainer)
