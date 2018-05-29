/**
 * View component for /posts/:postId/update
 *
 * Updates a single post from a copy of the selcted post
 * as defined in the post reducer
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

// import module components
import PostForm from '../components/PostForm.js.jsx';
import PostLayout from '../components/PostLayout.js.jsx';

// import post css modules
import postStyles from '../postModuleStyles.css';

class UpdatePost extends Base {
  constructor(props) {
    super(props);
    const { selectedPost, postMap } = this.props;
    this.state = {
      post: postMap[selectedPost.id] ?  _.cloneDeep(postMap[selectedPost.id]) : {}
      // NOTE: we don't want to change the store, just make changes to a copy
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

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(postActions.fetchSingleIfNeeded(match.params.postId))
  }

  componentWillReceiveProps(nextProps) {
    const { selectedPost, postMap } = nextProps;
    this.setState({
      post: postMap[selectedPost.id] ? _.cloneDeep(postMap[selectedPost.id]) : {}
      //we don't want to actually change the store's post, just use a copy
      , formHelpers: {}
    })
  }

  _handleFormChange(e) {
    let newState = _.update( this.state.post, e.target.name, () => {
      return e.target.value;
    });
    this.setState(newState);
  }

  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(postActions.sendUpdatePost(this.state.post)).then((action) => {
      if(action.success) {
        history.push(`/posts/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { selectedPost, postMap } = this.props;
    const { post, formHelpers } = this.state;
    const isEmpty = (!post || post._id === null || post._id === undefined);
    return  (
      <PostLayout>
        <div className="flex">
          <section className="section">
            {isEmpty ?
              (selectedPost.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              :
              <PostForm
                post={post}
                cancelLink={`/posts/${post._id}`}
                formHelpers={formHelpers}
                formTitle="Update Post"
                formType="update"
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

UpdatePost.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    selectedPost: store.post.selected
    , postMap: store.post.byId
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(UpdatePost)
);
