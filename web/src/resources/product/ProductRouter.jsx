/**
 * Sets up the routing for all Product views.
 */

// import primary libraries
import React from 'react';
import { Switch, useLocation } from 'react-router-dom';

// import global components
import YTRoute from '../../global/components/routing/YTRoute.jsx';

// import product views
import CreateProduct from './views/CreateProduct.jsx';
import ProductList from './views/ProductList.jsx';
import SearchableProductList from './views/SearchableProductList.jsx';
import SingleProduct from './views/SingleProduct.jsx';
import UpdateProduct from './views/UpdateProduct.jsx';

const ProductRouter = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[1];
  return (
    <Switch>
      <YTRoute
        breadcrumbs={[{ display: 'All products', path: null }]}
        component={ProductList}
        // login={true}
        exact
        path="/products"
      />
      <YTRoute
        breadcrumbs={[{ display: 'Search products', path: null }]}
        component={SearchableProductList}
        // login={true}
        exact
        path="/products/search"
      />
      <YTRoute
        breadcrumbs={[{ display: 'All products', path: '/products' }, { display: 'New ', path: null }]}
        component={CreateProduct}
        login={true}
        exact
        path="/products/new"
      />
      <YTRoute
        breadcrumbs={[{ display: 'All products', path: '/products' }, { display: 'Product details', path: null }]}
        component={SingleProduct}
        // login={true}
        exact
        path="/products/:productId"
      />
      <YTRoute
        breadcrumbs={[{ display: 'All products', path: '/products' }, { display: 'Product Details', path: `/products/${productId}` }, { display: 'Update', path: null }]}
        component={UpdateProduct}
        login={true}
        exact
        path="/products/:productId/update"
        // admin={true}
      />
    </Switch>
  )
}

export default ProductRouter;
