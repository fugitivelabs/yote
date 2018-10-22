/**
 * Wraps all Product views in a wrapping containter. If you want to give all
 * product views a sidebar for example, you would set that here.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';
import DefaultLayout from '../../../global/components/layouts/DefaultLayout.js.jsx';

import * as productActions from '../productActions';

class ProductLayout extends Binder {
  constructor(props) {
    super(props);

    // register and fire socket.io events
    const { dispatch } = props;
    let socket = io();

    // update product
    socket.on('product_update', product => {
      this.props.dispatch(productActions.addSingleProductToMap(product))
    })

  }

  render() {
    return (
      <DefaultLayout>
        {this.props.children}
      </DefaultLayout>
    )
  }
}

export default connect()(ProductLayout);
