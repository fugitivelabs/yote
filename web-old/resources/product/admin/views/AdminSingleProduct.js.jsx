/**
 * View component for /products/:productId
 *
 * Displays a single product from the 'byId' map in the product reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as productActions from '../../productActions';

// import global components
import Binder from '../../../../global/components/Binder.js.jsx';
import Breadcrumbs from '../../../../global/components/navigation/Breadcrumbs.js.jsx';

// import product components
import AdminProductLayout from '../components/AdminProductLayout.js.jsx';

class AdminSingleProduct extends Binder {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(productActions.fetchSingleIfNeeded(match.params.productId));
  }

  render() {
    const { location, match, productStore } = this.props;

    /**
     * use the selected.getItem() utility to pull the actual product object from the map
     */
    const selectedProduct = productStore.selected.getItem();

    const isEmpty = (
      !selectedProduct
      || !selectedProduct._id
      || productStore.selected.didInvalidate
    )

    const isFetching = (
      productStore.selected.isFetching
    )

    return (
      <AdminProductLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        <h3> Admin Single Product </h3>
        {isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <h1> { selectedProduct.title } </h1>
            <hr/>
            <p> {selectedProduct.description }</p>
            <p> <strong>Status: </strong> {selectedProduct.status}</p>
            <p> <strong>Is Featured? </strong> {selectedProduct.featured ? 'yes' : 'no'}</p>
            <Link to={`${this.props.match.url}/update`}> UPDATE PRODUCT </Link>
          </div>
        }
      </AdminProductLayout>
    )
  }
}

AdminSingleProduct.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    productStore: store.product
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(AdminSingleProduct)
);
