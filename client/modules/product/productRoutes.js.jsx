// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import utilities
import Auth from '../../global/utils/auth';

// import product components
import CreateProduct from './components/CreateProduct.js.jsx';
import ProductLayout from './components/ProductLayout.js.jsx';
import ProductList from './components/ProductList.js.jsx';
import SingleProduct from './components/SingleProduct.js.jsx';
import UpdateProduct from './components/UpdateProduct.js.jsx';

// define product routes
const productRoutes =
  <Route
    component={ProductLayout}
    key={Math.floor(Math.random()*100000)}
    path="/products"
  />
;

export default productRoutes;
