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
 * role matching the path=/admin/products.
 */

// import primary libraries
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// import global components
import Base from '../../../global/BaseComponent.js.jsx';
import YTRoute from '../../../global/routing/YTRoute.js.jsx';

// import product views
import AdminCreateProduct from './views/AdminCreateProduct.js.jsx';
import AdminProductList from './views/AdminProductList.js.jsx';
import AdminSingleProduct from './views/AdminSingleProduct.js.jsx';
import AdminUpdateProduct from './views/AdminUpdateProduct.js.jsx';

class ProductRouter extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    let singleProductPath = this.props.location.pathname.replace('/update', '');
    return (
      <Switch>
        <YTRoute
          breadcrumbs={[{display: 'All products', path: null }]}
          component={AdminProductList}
          exact
          path="/admin/products"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'All products', path: '/admin/products'}, {display: 'New ', path: null}]}
          component={AdminCreateProduct}
          exact
          path="/admin/products/new"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'All products', path: '/admin/products'}, {display: 'Product details', path: null}]}
          component={AdminSingleProduct}
          exact
          path="/admin/products/:productId"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'All products', path: '/admin/products'}, {display: 'Product Details', path: singleProductPath}, {display: 'Update', path: null}]}
          component={AdminUpdateProduct}
          exact
          path="/admin/products/:productId/update"
          role="admin"
        />
      </Switch>
    )
  }
}

export default ProductRouter;
