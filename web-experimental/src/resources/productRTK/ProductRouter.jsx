/**
 * Sets up the routing for all Product views.
 */

// import primary libraries
import React from 'react';
import { Switch, useLocation } from 'react-router-dom';

// import global components
import YTRoute from '../../global/components/routing/YTRoute.jsx';
// import ProductLayout from './components/ProductLayout.jsx';

// import product views
import CreateProduct from './views/CreateProduct.jsx';
import ProductList from './views/ProductList.jsx';
import SingleProduct from './views/SingleProduct.jsx';
import UpdateProduct from './views/UpdateProduct.jsx';

const ProductRouter = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[1];
  return (
    // render all product views inside <ProductLayout/> so we don't have to import it into every view.
    // <Route path="/products">
    //   <ProductLayout>
        <Switch>
          <YTRoute
            breadcrumbs={[{display: 'All products', path: null }]}
            component={ProductList}
            exact
            path="/products-rtk"
          />
          <YTRoute
            breadcrumbs={[{display: 'All products', path: '/products'}, {display: 'New ', path: null}]}
            component={CreateProduct}
            // login={true}
            exact
            path="/products-rtk/new"
          />
          <YTRoute
            breadcrumbs={[{display: 'All products', path: '/products'}, {display: 'Product details', path: null}]}
            component={SingleProduct}
            exact
            path="/products-rtk/:productId"
          />
          <YTRoute
            breadcrumbs={[{display: 'All products', path: '/products'}, {display: 'Product Details', path: `/products-rtk/${productId}`}, {display: 'Update', path: null}]}
            component={UpdateProduct}
            exact
            path="/products-rtk/:productId/update"
            // role="admin"
          />
          </Switch>
      //   </ProductLayout>
      // </Route>
  )
}

export default ProductRouter;
