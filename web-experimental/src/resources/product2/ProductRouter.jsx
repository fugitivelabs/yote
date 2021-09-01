/**
 * Sets up the routing for all Product views.
 *
 * NOTE: As an example, we've included two other Route Components that protect a given
 * path: LoginRoute and RoleRoute
 *
 * LoginRoute simply checks if the user is logged in and if NOT, it redirects
 * them to the login page.
 *
 * RoleRoute protects the path to make sure the user is A) logged in and B) has
 * role matching the path= prop.
 * 
 * YOTE3 NOTE: login and role stuff needs to be reworked. Currently doesn't work.
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

const ProductRouter2 = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[1];
  return (
    // render all product views inside <ProductLayout/> so we don't have to import it into every view.
    // <Route path="/products2">
    //   <ProductLayout>
        <Switch>
          <YTRoute
            breadcrumbs={[{display: 'All products', path: null }]}
            component={ProductList}
            exact
            path="/products2"
          />
          <YTRoute
            breadcrumbs={[{display: 'All products', path: '/products2'}, {display: 'New ', path: null}]}
            component={CreateProduct}
            // login={true}
            exact
            path="/products2/new"
          />
          <YTRoute
            breadcrumbs={[{display: 'All products', path: '/products2'}, {display: 'Product details', path: null}]}
            component={SingleProduct}
            exact
            path="/products2/:productId"
          />
          <YTRoute
            breadcrumbs={[{display: 'All products', path: '/products2'}, {display: 'Product Details', path: `/products2/${productId}`}, {display: 'Update', path: null}]}
            component={UpdateProduct}
            exact
            path="/products2/:productId/update"
            // role="admin"
          />
          </Switch>
      //   </ProductLayout>
      // </Route>
  )
}

export default ProductRouter2;
