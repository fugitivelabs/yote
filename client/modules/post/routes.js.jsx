

import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import Components
import Layout from './components/Layout.js.jsx';
import List from './components/List.js.jsx';
import Populated from './components/Populated.js.jsx';
import Create from './components/Create.js.jsx';
import Update from './components/Update.js.jsx';

const postRoutes =
<Route path="/posts" component={Layout} >
  <IndexRoute component={List} />
  <Route path="/posts/new" component={Create} />
  <Route path="/posts/:slug">
    <IndexRoute component={Populated} />
    <Route path="/posts/:slug/update" component={Update} />
  </Route>
</Route>

;

export default postRoutes;
