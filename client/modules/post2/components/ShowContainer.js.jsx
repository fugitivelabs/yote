import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Base from "../../../global/components/BaseComponent.js.jsx";
import { fetchSinglePost } from '../postActions'
import Show from './Show.js.jsx'

class ShowContainer extends Base{
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

ShowContainer.propTypes = {
  post: PropTypes.object.isRequired
  , dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (store, ownProps) => {
  console.log(store);
  return {
    id: ownProps.params.postId
    , post: store.posts.single.item
  }
}

export default connect(mapStateToProps)(ShowContainer)
