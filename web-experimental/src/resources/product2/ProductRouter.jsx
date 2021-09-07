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
import SingleProduct from './views/SingleProduct.jsx';
import UpdateProduct from './views/UpdateProduct.jsx';

const ProductRouter2 = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[1];
  return (
    <Switch>
      <YTRoute
        breadcrumbs={[{display: 'All products', path: null }]}
        component={ProductList}
        // login={true}
        exact
        path="/products2"
      />
      <YTRoute
        breadcrumbs={[{display: 'All products', path: '/products2'}, {display: 'New ', path: null}]}
        component={CreateProduct}
        login={true}
        exact
        path="/products2/new"
      />
      <YTRoute
        breadcrumbs={[{display: 'All products', path: '/products2'}, {display: 'Product details', path: null}]}
        component={SingleProduct}
        // login={true}
        exact
        path="/products2/:productId"
      />
      <YTRoute
        breadcrumbs={[{display: 'All products', path: '/products2'}, {display: 'Product Details', path: `/products2/${productId}`}, {display: 'Update', path: null}]}
        component={UpdateProduct}
        login={true}
        exact
        path="/products2/:productId/update"
        // role="admin"
      />
    </Switch>
  )
}

export default ProductRouter2;
