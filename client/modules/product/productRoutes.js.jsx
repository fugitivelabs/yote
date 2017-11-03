/**
 * Initializes the __PascalName__ routes to point to the __PascalName__Layout
 * file. This is done here so we can generate modules via the CLI and cleanly
 * import the routes via the moduleRoutes.js file. 
 */

// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import product layout
import ProductLayout from './components/ProductLayout.js.jsx';

// initialize product routes
const productRoutes =
  <Route
    component={ProductLayout}
    key={Math.floor(Math.random()*100000)}
    path="/products"
  />
;

export default productRoutes;
