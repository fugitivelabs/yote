import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//import Post



const postRoutes =
<Route path="/posts" component={PostLayout} >
  <IndexRoute component={PostList} />

</Route>

;

export default postRoutes;
