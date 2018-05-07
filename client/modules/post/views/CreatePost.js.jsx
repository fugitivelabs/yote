/**
 * View component for /posts/new
 *
 * Creates a new post from a copy of the defaultItem in the post reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history, withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as postActions from '../postActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import post components
import PostForm from '../components/PostForm.js.jsx';
import PostLayout from '../components/PostLayout.js.jsx';

class CreatePost extends Base {
  constructor(props) {
    super(props);
    this.state = {
      post: _.cloneDeep(this.props.defaultPost)
      // NOTE: We don't want to actually change the store's defaultItem, just use a copy
      , formHelpers: {}
      /**
       * NOTE: formHelpers are useful for things like radio controls and other
       * things that manipulate the form, but don't directly effect the state of
       * the post
       */
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  _handleFormChange(e) {
    /**
     * This let's us change arbitrarily nested objects with one pass
     */
    let newState = _.update( this.state.post, e.target.name, () => {
      return e.target.value;
    });
    this.setState(newState);
    
  }


  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(postActions.sendCreatePost(this.state.post)).then((action) => {
      if(action.success) {
        dispatch(postActions.invalidateList());
        history.push(`/posts/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { post, formHelpers } = this.state;
    const isEmpty = (post.title === null || post.title === undefined);
    return (
      <PostLayout>
        <div className="flex">
          <section className="section">
            {isEmpty ?
              <h2> Loading...</h2>
              :
              <PostForm
                post={post}
                cancelLink="/posts"
                formHelpers={formHelpers}
                formTitle="Create Post"
                formType="create"
                handleFormChange={this._handleFormChange}
                handleFormSubmit={this._handleFormSubmit}
                />
            }
          </section>
        </div>
      </PostLayout>
    )
  }
}

CreatePost.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    defaultPost: store.post.defaultItem
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(CreatePost)
);
