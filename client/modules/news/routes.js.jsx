import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//import Post
import Layout from './containers/Layout.js.jsx';
import List from './containers/List.js.jsx';

const newsRoutes =
<Route path="news" component={Layout} >
  <IndexRoute component={List} />
</Route>

;

export default newsRoutes;
