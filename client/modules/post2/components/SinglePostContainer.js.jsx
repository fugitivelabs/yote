import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Base from "../../../global/components/BaseComponent.js.jsx";
import { fetchSinglePost } from '../postActions'
import Show from './Show.js.jsx'

class SinglePostContainer extends Base{
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log("fetching...");
    this.props.dispatch(fetchSinglePost(this.props.id))
  }

  render() {
    return (
      <div>
        <Show post={this.props.post}/>
      </div>
    )
  }

}

SinglePostContainer.propTypes = {
  post: PropTypes.object.isRequired
  , dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.postId
    , post: state.posts.single.item
  }
}

export default connect(mapStateToProps)(SinglePostContainer)
