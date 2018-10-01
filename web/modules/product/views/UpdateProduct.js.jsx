/**
 * View component for /products/:productId/update
 *
 * Updates a single product from a copy of the selcted product
 * as defined in the product reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as productActions from '../productActions';

// import global components
import Binder from '../../../global/Binder.js.jsx';
import Breadcrumbs from '../../../global/navigation/Breadcrumbs.js.jsx';

// import product components
import ProductLayout from '../components/ProductLayout.js.jsx';
import ProductForm from '../components/ProductForm.js.jsx';

class UpdateProduct extends Binder {
  constructor(props) {
    super(props);
    const { match, productStore } = this.props;
    this.state = {
      formHelpers: {}
      , product: productStore.byId[match.params.productId] ? _.cloneDeep(productStore.byId[match.params.productId]) : {}
      // NOTE: ^ we don't want to change the store, just make changes to a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(productActions.fetchSingleIfNeeded(match.params.productId))
  }

  componentWillReceiveProps(nextProps) {
    const { match, productStore } = nextProps;
    this.setState({
      product: productStore.byId[match.params.productId] ? _.cloneDeep(productStore.byId[match.params.productId]) : {}
      // NOTE: ^ we don't want to actually change the store's product, just use a copy
    })
  }

  _handleFormChange(e) {
    var newState = _.update(this.state, e.target.name, function() {
      return e.target.value;
    });
    this.setState({newState});
  }

  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(productActions.sendUpdateProduct(this.state.product)).then((action) => {
      if(action.success) {
        history.push(`/products/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const {
      location
      , match
      , productStore
    } = this.props;
    const { formHelpers, product } = this.state;

    const selectedProduct = productStore.selected.getItem();

    const isEmpty = (
      !product
      || !selectedProduct
      || !selectedProduct._id
    );

    const isFetching = (
      !productStore.selected.id
      || productStore.selected.isFetching
    )

    return  (
      <ProductLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        {isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <ProductForm
            product={product}
            cancelLink={`/products/${product._id}`}
            formHelpers={formHelpers}
            formTitle="Update Product"
            formType="update"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
          />
        }
      </ProductLayout>
    )
  }
}

UpdateProduct.propTypes = {
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
  )(UpdateProduct)
);
