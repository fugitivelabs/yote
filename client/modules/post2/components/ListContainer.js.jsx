import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Base from "../../../global/components/BaseComponent.js.jsx";
import * as Actions from '../postActions'
import List from './List.js.jsx'

class ListPostsContainer extends Base{
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(Actions.fetchAllPosts())
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <List posts={this.props.posts} />
      </div>
    )
  }

}

// //i THINK this is for server side rendering. hard to find docs.
// //http://webcache.googleusercontent.com/search?q=cache:zKXAgrgZJYQJ:thelearningcollective.nyc/tims-last-check-in-of-2015/+&cd=2&hl=en&ct=clnk&gl=us
// ListPostsContainer.need = [
//   function() {
//     return Actions.fetchAllPosts();
//   }
// ];

ListPostsContainer.propTypes = {
  posts: PropTypes.shape({
    items: PropTypes.array.isRequired
  })
  , dispatch: PropTypes.func.isRequired
}
ListPostsContainer.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (store, ownProps) => {
  console.log(store);
  return {
    posts: store.posts.list
  }
}

export default connect(mapStateToProps)(ListPostsContainer)
