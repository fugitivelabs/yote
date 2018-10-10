/**
 * View component for /products/new
 *
 * Creates a new product from a copy of the defaultItem in the product reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as productActions from '../../productActions';

// import global components
import Base from '../../../../global/BaseComponent.js.jsx';
import Breadcrumbs from '../../../../global/navigation/Breadcrumbs.js.jsx';

// import product components
import AdminProductForm from '../components/AdminProductForm.js.jsx';
import AdminProductLayout from '../components/AdminProductLayout.js.jsx';

class AdminCreateProduct extends Base {
  constructor(props) {
    super(props);
    this.state = {
      formHelpers: {
        statuses: ['published', 'draft', 'archived']
      }
      , product: _.cloneDeep(this.props.defaultProduct.getItem())
      // NOTE: We don't want to actually change the store's defaultItem, just use a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(productActions.fetchDefaultProduct());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      product: _.cloneDeep(nextProps.defaultProduct.getItem())
    })
  }

  _handleFormChange(e) {
    /**
     * This let's us change arbitrarily nested objects with one pass
     */
    let newState = _.update(this.state, e.target.name, function() {
      return e.target.value;
    });
    this.setState({newState});
  }


  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(productActions.sendCreateProduct(this.state.product)).then((action) => {
      if(action.success) {
        dispatch(productActions.invalidateList());
        history.push(`/products/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { location } = this.props;
    const { formHelpers, product } = this.state;
    const isEmpty = (!product || product.title === null || product.title === undefined);
    return (
      <AdminProductLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        {isEmpty ?
          <h2> Loading...</h2>
          :
          <AdminProductForm
            product={product}
            cancelLink="/admin/products"
            formHelpers={formHelpers}
            formTitle="Create Product"
            formType="create"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
          />
        }
      </AdminProductLayout>
    )
  }
}

AdminCreateProduct.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    defaultProduct: store.product.defaultItem
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(AdminCreateProduct)
);
