/**
 * Initializes the Product routes to point to the ProductLayout
 * file. This is done here so we can generate modules via the CLI and cleanly
 * import the routes via the moduleRoutes.js file.
 */

// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import product layout
import ProductRouter from './ProductRouter.js.jsx';

// initialize product routes
const productPath =
  <Route
    component={ProductRouter}
    key={Math.floor(Math.random()*100000)}
    path="/products"
  />
;

export default productPath;
