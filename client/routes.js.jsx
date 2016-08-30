import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import custom components
import Root from './global/components/Root.js.jsx';
import Landing from './modules/static/components/landing/Landing.js.jsx';

const routes =
      <Route path="/" component={Root} >
        <IndexRoute component={Landing} />
        { Object.keys(moduleRoutes).map((moduleName, i) =>
          moduleRoutes[moduleName]
        )}
      </Route>
;

export default routes;

// import userRoutes from './modules/user/userRoutes.js.jsx';
// import postRoutes from './modules/post/postRoutes.js.jsx';
// import productRoutes from './modules/product/productRoutes.js.jsx';
// {userRoutes}
// {postRoutes}
// {productRoutes}


import * as moduleRoutes from './modules/moduleRoutes.js';
