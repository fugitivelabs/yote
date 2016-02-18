import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Base from "../../../global/components/BaseComponent.js.jsx";
import * as Actions from '../postActions'
import Edit from './Edit.js.jsx'

class EditContainer extends Base{
  constructor(props) {
    super(props)
    console.log("constructing...");
    console.log(this.props.post);
    this.state = this.props;
    this._bind('_handleFormChange', '_handleSubmitAction');
  }

  componentWillMount() {
    console.log("fetching...");
    this.props.dispatch(Actions.fetchSinglePost(this.props.id))
  }

  componentWillReceiveProps(nextProps) {
    //props might not be defined when constructor is called,
    // so we need to wait and update the state when we get new prop
    // (note: only because we need to let the user edit things. otherwise we'll just use props)
    // console.log("receiving props");
    // console.log(nextProps.post);
    this.setState(nextProps);
  }

  _handleSubmitAction(event, data) {
    event.preventDefault();
    console.log("EDIT ACTION");
    console.log(data);
    //VALIDATION...
    this.props.dispatch(Actions.sendUpdatePost(this.state.post));
  }

  _handleFormChange(e) {
    console.log("form change")
    var newPostState = this.state.post;
    newPostState[e.target.name] = e.target.value;
    this.setState(newPostState);

  }

  render() {
    return (
      <div>
        <Edit
          post={this.state.post}
          changeAction={this._handleFormChange}
          submitAction={this._handleSubmitAction}
        />
      </div>
    )
  }

}

EditContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (store, ownProps) => {
  // console.log("map props");
  return {
    id: ownProps.params.postId
    , post: store.posts.single.item
  }
}

export default connect(mapStateToProps)(EditContainer)
