// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import product layout
import ProductLayout from './components/ProductLayout.js.jsx';

// initialize product routes here so we can import them via moduleRoutes 
const productRoutes =
  <Route
    component={ProductLayout}
    key={Math.floor(Math.random()*100000)}
    path="/products"
  />
;

export default productRoutes;
