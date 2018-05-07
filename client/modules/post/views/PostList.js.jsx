/**
 * View component for /posts
 *
 * Generic post list view. Defaults to 'all' with:
 * this.props.dispatch(postActions.fetchListIfNeeded());
 *
 * NOTE: See /product/views/ProductList.js.jsx for more examples
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
import PostListItem from '../components/PostListItem.js.jsx';

// import post css modules
import postStyles from '../postModuleStyles.css';

class PostList extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch a list of your choice
    this.props.dispatch(postActions.fetchListIfNeeded()); // defaults to 'all'
  }

  render() {
    const { postStore } = this.props;

    /**
     * Retrieve the list information and the list items for the component here.
     *
     * NOTE: if the list is deeply nested and/or filtered, you'll want to handle
     * these steps within the mapStoreToProps method prior to delivering the
     * props to the component.  Othwerwise, the render() action gets convoluted
     * and potentially severely bogged down.
     */

    // get the postList meta info here so we can reference 'isFetching'
    const postList = postStore.lists ? postStore.lists.all : null;

    /**
     * use the reducer getList utility to convert the all.items array of ids
     * to the actual post objetcs
     */
    const postListItems = postStore.util.getList("all");

    /**
     * NOTE: isEmpty is is usefull when the component references more than one
     * resource list.
     */
    const isEmpty = !postListItems || !postList;

    return (
      <PostLayout>
        <div className="flex">
          <section className="section">
            <div className="yt-container">
              <h1> Post List
                <Link className="yt-btn small u-pullRight" to={'/posts/new'}> NEW Post </Link>
              </h1>
              <hr/>
              { isEmpty ?
                (postListItems && postList.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                :
                <div style={{ opacity: postList.isFetching ? 0.5 : 1 }}>
                  <ul>
                    {postListItems.map((post, i) =>
                      <PostListItem key={post._id + i} post={post} />
                    )}
                  </ul>
                </div>
              }
            </div>
          </section>
        </div>
      </PostLayout>
    )
  }
}

PostList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    postStore: store.post
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(PostList)
);
