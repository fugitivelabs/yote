/**
 * View component for /posts/:postId
 *
 * Displays a single post from the 'byId' map in the post reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as postActions from '../postActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import post components
import PostLayout from '../components/PostLayout.js.jsx';

// import post css modules
import postStyles from '../postModuleStyles.css';


class SinglePost extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(postActions.fetchSingleIfNeeded(match.params.postId));
  }

  render() {
    const { postStore, postMap, userMap } = this.props;
    /**
     * use the selected.getItem() utility to pull the actual post object from the map
     */
    const selectedPost = postStore.selected.getItem();

    const isEmpty = (
      !selectedPost
      || !selectedPost._id
      || postStore.selected.didInvalidate
    );

    return (
      <PostLayout>
        <div className="flex">
          <section className="section">
            <div className="yt-container">
              <h3> Single Post </h3>
              {isEmpty ?
                (postStore.selected.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                :
                <div style={{ opacity: postStore.selected.isFetching ? 0.5 : 1 }}>
                  <h1> { selectedPost.title }
                    <Link className="yt-btn small u-pullRight" to={`${this.props.match.url}/update`}> UPDATE Post </Link>
                  </h1>
                  <hr/>
                  <p><em> { selectedPost.content } </em></p>
                  <p><em> By: <Link to={`/users/${postMap[postStore.selected.id]._author._id}`}> {postMap[postStore.selected.id]._author.firstName} {postMap[postStore.selected.id]._author.lastName} </Link> </em></p>
                
                </div>
              }
            </div>
          </section>
        </div>
      </PostLayout>
    )
  }
}

SinglePost.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    postStore: store.post
    , postMap: store.post.byId
    , userMap: store.user.lists
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(SinglePost)
);
