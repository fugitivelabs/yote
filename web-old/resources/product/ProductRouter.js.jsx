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
 */

// import primary libraries
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// import global components
import Binder from '../../global/components/Binder.js.jsx';
import YTRoute from '../../global/components/routing/YTRoute.js.jsx';

// import product views
import CreateProduct from './views/CreateProduct.js.jsx';
import ProductList from './views/ProductList.js.jsx';
import SingleProduct from './views/SingleProduct.js.jsx';
import UpdateProduct from './views/UpdateProduct.js.jsx';

class ProductRouter extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    let singleProductPath = this.props.location.pathname.replace('/update', '');
    return (
      <Switch>
        <YTRoute
          breadcrumbs={[{display: 'All products', path: null }]}
          component={ProductList}
          exact
          path="/products"
        />
        <YTRoute
          breadcrumbs={[{display: 'All products', path: '/products'}, {display: 'New ', path: null}]}
          component={CreateProduct}
          exact
          path="/products/new"
        />
        <YTRoute
          breadcrumbs={[{display: 'All products', path: '/products'}, {display: 'Product details', path: null}]}
          component={SingleProduct}
          exact
          path="/products/:productId"
        />
        <YTRoute
          breadcrumbs={[{display: 'All products', path: '/products'}, {display: 'Product Details', path: singleProductPath}, {display: 'Update', path: null}]}
          component={UpdateProduct}
          exact
          path="/products/:productId/update"
        />
      </Switch>
    )
  }
}

export default ProductRouter;
