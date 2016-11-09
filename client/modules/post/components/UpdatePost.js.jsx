import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

// import actions
import { singleActions as postSingleActions, listActions as postListActions } from '../actions';

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
    const { dispatch, params } = this.props;
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
    this.props.dispatch(postSingleActions.sendUpdatePost(this.state.item)).then((res) => {
      if(res.success) {
        this.props.dispatch(postListActions.invaldiateList("all"));
        browserHistory.push(`/posts/${res.post._id}`)
      } else {
        console.log("Response Error:");
        console.log(res);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { item } = this.state;
    const isEmpty = (item.title === null || item.title === undefined);
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
  return {
    item: store.post.single.item
  }
}

export default connect(
  mapStoreToProps
)(UpdatePost);
