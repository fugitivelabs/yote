import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import _ from 'lodash';

// import actions
import { singleActions as postSingleActions } from '../actions';
import { listActions as userListActions } from '../../user/actions';

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
    // console.log("Single item mounting");
    // console.log(this.context);

    // action.fetchItem();

    // const populate = false;
    const { dispatch, params } = this.props;
    dispatch(userListActions.fetchList());
    if(params.postId) {
      dispatch(postSingleActions.fetchSinglePostById(params.postId ))
    } else {
      dispatch(postSingleActions.fetchSinglePostBySlug(params.slug))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  _handleFormChange(e) {
    var newState = _.update( this.state.item, e.target.name, function() {
      return e.target.value;
    });
    this.setState(newState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(postSingleActions.sendUpdatePost(this.state.item));
  }

  render() {
    const { item, users } = this.state;
    const isEmpty = !item;
    return  (
      <div >
        {isEmpty
          ? <h2> Loading...</h2>
            : <PostForm
              post={item}
              users={users}
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
    , users: store.user.list.items
  }
}

export default connect(
  mapStoreToProps
)(UpdatePost);
