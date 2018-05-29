/**
 * Set up routing for all Post views
 *
 * For an example with protected routes, refer to /product/ProductRouter.js.jsx
 */

// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import global components
import Base from "../../global/components/BaseComponent.js.jsx";
import YTRoute from '../../global/components/routing/YTRoute.js.jsx';

// import post views
import CreatePost from './views/CreatePost.js.jsx';
import PostList from './views/PostList.js.jsx';
import SinglePost from './views/SinglePost.js.jsx';
import UpdatePost from './views/UpdatePost.js.jsx';

class PostRouter extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <YTRoute exact path="/posts" component={PostList} />
        <YTRoute exact login={true} path="/posts/new" component={CreatePost} />
        <YTRoute exact path="/posts/:postId" component={SinglePost}/>
        <YTRoute exact login={true} path="/posts/:postId/update" component={UpdatePost}/>
      </Switch>
    )
  }
}

export default PostRouter;
