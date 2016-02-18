import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import Post
// import PostContainer from './containers/Layout.js.jsx';
// import Layout from './containers/Layout.js.jsx';
import ListContainer from './components/ListContainer.js.jsx'
import ShowContainer from './components/ShowContainer.js.jsx'
import NewContainer from './components/NewContainer.js.jsx'
import EditContainer from './components/EditContainer.js.jsx'

const postRoutes =
  <Route path="/posts" >
    <IndexRoute component={ListContainer} />
    <Route path="/posts/new" component={NewContainer} />
    <Route path="/posts/:postId" component={ShowContainer} />
    <Route path="/posts/:postId/edit" component={EditContainer} />
  </Route>


export default postRoutes;
