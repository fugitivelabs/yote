/**
 * Wraps all Product components in a default view wrapper and sets up the
 * routing for all Product CRUD actions.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

// import utilities
import Auth from '../../../global/utils/auth';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";
import DefaultLayout from "../../../global/components/DefaultLayout.js.jsx";

// import product components
import CreateProduct from './CreateProduct.js.jsx';
import ProductList from './ProductList.js.jsx';
import SingleProduct from './SingleProduct.js.jsx';
import UpdateProduct from './UpdateProduct.js.jsx';


class ProductLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DefaultLayout>
        <Switch >
          <Route exact path="/products" component={ProductList} />
          <Route
            path="/products/new"
            render={() => (
              Auth.notLoggedIn() ?
                <Redirect to={{
                    pathname: "/user/login"
                    , state: { from: this.props.location }
                  }}
                />
              :
                <CreateProduct />
            )}
          />
          <Route
            path="/products/:productId/update"
            render={() => (
              Auth.notLoggedIn() ?
                <Redirect to={{
                    pathname: "/user/login"
                    , state: { from: this.props.location }
                  }}
                />
              :
                <UpdateProduct />
            )}
          />
          <Route path="/products/:productId" component={SingleProduct}/>
        </Switch>
      </DefaultLayout>
    )
  }
}

export default ProductLayout;
