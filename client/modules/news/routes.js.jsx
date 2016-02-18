import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//import Containers
import Layout from './containers/Layout.js.jsx';
import List from './containers/List.js.jsx';
import Single from './containers/Single.js.jsx';
import Create from './containers/Create.js.jsx';
import Update from './containers/Update.js.jsx';

const newsRoutes =
<Route path="/news" component={Layout} >
  <IndexRoute component={List} />
  <Route path="new-item" component={Create} />
  <Route path=":slug" >
    <IndexRoute component={Single} />
    <Route path="edit" component={Update} />
  </Route>
  <Route path="byId/:postId" >
    <IndexRoute component={Single} />
  </Route>
</Route>

;

export default newsRoutes;
