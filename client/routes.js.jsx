import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//import custom components
import Layout from './global/components/Layout.js.jsx';
import Landing from './global/components/Landing.js.jsx';

//import Post

const routes =
      <Route path="/" component={Layout} >
        <IndexRoute component={Landing} />
        {postRoutes}
        {newsRoutes}
      </Route>
;


export default routes;



import postRoutes from './modules/post/routes.js.jsx';
import newsRoutes from './modules/news/routes.js.jsx';
