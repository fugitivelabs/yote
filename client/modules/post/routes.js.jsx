

import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//import Post

import PostLayout from './components/Layout.js.jsx';
import PostList from './components/List.js.jsx';
import PostShow from './components/Show.js.jsx';
import PostCreate from './components/Create.js.jsx';
import PostUpdate from './components/Update.js.jsx';

const postRoutes =
<Route path="/posts" component={PostLayout} >
  <IndexRoute component={PostList} />
  <Route path="/posts/new" component={PostCreate} />
  <Route path="/posts/:postId" component={PostShow} />
  <Route path="/posts/:postId/update" component={PostUpdate} />
</Route>

;

export default postRoutes;
