/**
 * Sets up the routing for all Product views.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

// import global components
import Base from "../../global/components/BaseComponent.js.jsx";
import { LoginRoute, RoleRoute } from '../../global/components/routing';

// import product views
import CreateProduct from './views/CreateProduct.js.jsx';
import ProductList from './views/ProductList.js.jsx';
import SingleProduct from './views/SingleProduct.js.jsx';
import UpdateProduct from './views/UpdateProduct.js.jsx';

class ProductRouter extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/products" component={ProductList} />
        <LoginRoute exact path="/products/new" component={CreateProduct} />
        <Route exact path="/products/:productId" component={SingleProduct}/>
        <RoleRoute exact path="/products/:productId/update" component={UpdateProduct} role="admin"/>
      </Switch>
    )
  }
}

export default ProductRouter;
