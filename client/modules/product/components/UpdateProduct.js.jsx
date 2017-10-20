/**
 * Updates a single product from a copy of the selcted product
 * as defined in the product reducer
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as productActions from '../productActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import module components
import ProductForm from './ProductForm.js.jsx';

class UpdateProduct extends Base {
  constructor(props) {
    super(props);
    const { selectedProduct, productMap } = this.props;
    this.state = {
      product: productMap[selectedProduct.id] ? { ...productMap[selectedProduct.id] } : {}
      // NOTE: we don't want to change the store, just make changes to a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(productActions.fetchSingleIfNeeded(params.productId))
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProduct, productMap } = nextProps;
    this.state = {
      product: productMap[selectedProduct.id] ? { ...productMap[selectedProduct.id] } : {}
      //we don't want to actually change the store's product, just use a copy
    }
  }

  _handleFormChange(e) {
    var newProductState = _.update( this.state.product, e.target.name, function() {
      return e.target.value;
    });
    this.setState({product: newProductState});
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(productActions.sendUpdateProduct(this.state.product)).then((action) => {
      if(action.success) {
        browserHistory.push(`/products/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { selectedProduct, productMap } = this.props;
    const { product } = this.state;
    const isEmpty = (!product || product.title === null || product.title === undefined);
    return  (
      <div className="flex">
        <section className="section">
          {isEmpty
            ? (selectedProduct.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <ProductForm
              product={product}
              formType="update"
              handleFormSubmit={this._handleFormSubmit}
              handleFormChange={this._handleFormChange}
              cancelLink={`/products/${product._id}`}
              formTitle="Update Product"
            />
          }
        </section>
      </div>
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
    selectedProduct: store.product.selected
    , productMap: store.product.byId
  }
}

export default connect(
  mapStoreToProps
)(UpdateProduct);
