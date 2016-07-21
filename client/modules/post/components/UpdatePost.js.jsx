import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import { singleActions } from '../actions';

// import components
import PostForm from './PostForm.js.jsx';

class UpdatePost extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentDidMount() {
    console.log("Single item mounting");
    // console.log(this.context);

    // action.fetchItem();
    const populate = false;
    // const populate = false;
    const { dispatch, params } = this.props;
    if(params.postId) {
      dispatch(singleActions.fetchSinglePostById(params.postId, populate ))
    } else {
      dispatch(singleActions.fetchSinglePostBySlug(params.slug))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  _handleFormChange(e) {
    var nextState = this.state.item;
    nextState[e.target.name] = e.target.value;
    nextState.status = nextState.isPublished ? "published" : "draft";
    this.setState(nextState);

  }

  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(singleActions.sendUpdatePost(this.state.item));
  }

  render() {
    const { item } = this.state;
    const isEmpty = !item;
    return  (
      <div >
        {isEmpty
          ? <h2> Loading...</h2>
          : <PostForm
            post={item}
            formType="update"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink={`/posts/${item.slug}`}
            formTitle="Update Post"
            />
        }
      </div>
    )
  }
}

UpdatePost.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  // console.log("State");
  // console.log(state);
  return {
    item: store.post.single.item
  }
}

export default connect(
  mapStoreToProps
)(UpdatePost);
