// import primary libraries
import React from 'react';
import { Route } from 'react-router-dom';

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
<Route key={Math.floor(Math.random()*1000)} path="products" component={ProductLayout} >
  <Route path="new" component={CreateProduct} onEnter={Auth.requireLogin} />
  <Route path=":productId" component={SingleProduct}>
    <Route path="update" component={UpdateProduct} onEnter={Auth.requireLogin} />
  </Route>
</Route>
;

export default productRoutes;
