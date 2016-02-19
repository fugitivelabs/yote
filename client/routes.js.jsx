import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import custom components
import Layout from './global/components/Layout.js.jsx';
import Landing from './global/components/Landing.js.jsx';

//import Post

const routes =
      <Route path="/" component={Layout} >
        <IndexRoute component={Landing} />
        {postRoutes}
        {productRoutes}
      </Route>
;


export default routes;



import postRoutes from './modules/post/routes.js.jsx';
import productRoutes from './modules/product/routes.js.jsx';
