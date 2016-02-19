import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import custom components
import Layout from './global/components/Layout.js.jsx';
import Landing from './global/components/Landing.js.jsx';

//import Post

const routes =
      <Route path="/" component={Layout} >
        <IndexRoute component={Landing} />
        {userRoutes}
        {postRoutes}
      </Route>
;

export default routes;

import userRoutes from './modules/user/userRoutes.js.jsx';
import postRoutes from './modules/post/postRoutes.js.jsx';
