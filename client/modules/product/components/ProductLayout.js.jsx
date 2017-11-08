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

class ProductLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default ProductLayout;
