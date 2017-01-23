

import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import Components
import ProductLayout from './components/ProductLayout.js.jsx';
import ProductList from './components/ProductList.js.jsx';
import SingleProduct from './components/SingleProduct.js.jsx';
import CreateProduct from './components/CreateProduct.js.jsx';
import UpdateProduct from './components/UpdateProduct.js.jsx';

const productRoutes =
<Route key={Math.floor(Math.random()*1000)} path="/products" component={ProductLayout} >
  <IndexRoute component={ProductList} />
  <Route path="/products/new" component={CreateProduct} />
  <Route path="/products/:productId">
    <IndexRoute component={SingleProduct} />
    <Route path="/products/:productId/update" component={UpdateProduct} />
  </Route>
</Route>

;

export default productRoutes;
