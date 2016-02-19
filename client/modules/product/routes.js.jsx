

import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import Components
import Layout from './components/Layout.js.jsx';
import List from './components/List.js.jsx';
import Single from './components/Single.js.jsx';
import Create from './components/Create.js.jsx';
import Update from './components/Update.js.jsx';

const productRoutes =
<Route path="/products" component={Layout} >
  <IndexRoute component={List} />
  <Route path="/products/new" component={Create} />
  <Route path="/products/:productId">
    <IndexRoute component={Single} />
    <Route path="/products/:productId/update" component={Update} />
  </Route>
</Route>

;

export default productRoutes;
