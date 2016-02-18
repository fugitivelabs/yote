import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import Post
// import PostContainer from './containers/Layout.js.jsx';
// import Layout from './containers/Layout.js.jsx';
import ListPostsContainer from './components/ListPostsContainer.js.jsx'
import SinglePostContainer from './components/SinglePostContainer.js.jsx'
import Show from './components/Show.js.jsx'

const postRoutes =
  <Route path="/posts" >
    <IndexRoute component={ListPostsContainer} />
    <Route path="/posts/:postId" component={SinglePostContainer}>
      <IndexRoute component={Show} />
    </Route>
  </Route>


export default postRoutes;
