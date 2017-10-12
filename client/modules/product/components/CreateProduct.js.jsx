/**
 * Creates a new product from a copy of the defaultItem in the product reducer
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as productActions from '../productActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import product components
import ProductForm from './ProductForm.js.jsx';

class CreateProduct extends Base {
  constructor(props) {
    super(props);
    this.state = {
      product: { ...this.props.defaultProduct }

      // NOTE: We don't want to actually change the store's defaultItem, just use a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  _handleFormChange(e) {
    /**
     * This let's us change arbitrarily nested objects with one pass
     */
    let newProductState = _.update( this.state.product, e.target.name, function() {
      return e.target.value;
    });
    this.setState({product: newProductState});
  }


  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(productActions.sendCreateProduct(this.state.product)).then((action) => {
      if(action.success) {
        this.props.dispatch(productActions.invalidateList());
        browserHistory.push(`/products/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { product } = this.state;
    const isEmpty = (product.title === null || product.title === undefined);
    return (
      <div className="flex">
        <section className="section">
          {isEmpty ?
            <h2> Loading...</h2>
            :
            <ProductForm
              product={product}
              formType="create"
              handleFormSubmit={this._handleFormSubmit}
              handleFormChange={this._handleFormChange}
              cancelLink="/products"
              formTitle="Create Product"
            />
          }
        </section>
      </div>
    )
  }
}

CreateProduct.propTypes = {
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

export default connect(
  mapStoreToProps
)(CreateProduct);
