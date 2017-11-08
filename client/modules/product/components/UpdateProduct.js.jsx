/**
 * Updates a single product from a copy of the selcted product
 * as defined in the product reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history, withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as productActions from '../productActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import module components
import ProductLayout from './ProductLayout.js.jsx';
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
    const { dispatch, match } = this.props;
    dispatch(productActions.fetchSingleIfNeeded(match.params.productId))
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProduct, productMap } = nextProps;
    this.setState({
      product: productMap[selectedProduct.id] ? { ...productMap[selectedProduct.id] } : {}
      //we don't want to actually change the store's product, just use a copy
    })
  }

  _handleFormChange(e) {
    var newProductState = _.update( this.state.product, e.target.name, function() {
      return e.target.value;
    });
    this.setState({product: newProductState});
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
    const { selectedProduct, productMap } = this.props;
    const { product } = this.state;
    const isEmpty = (!product || product.title === null || product.title === undefined);
    return  (
      <ProductLayout>
        <div className="flex">
          <section className="section">
            {isEmpty
              ? (selectedProduct.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
            : <ProductForm
                product={product}
                cancelLink={`/products/${product._id}`}
                formTitle="Update Product"
                formType="update"
                handleFormChange={this._handleFormChange}
                handleFormSubmit={this._handleFormSubmit}
              />
            }
          </section>
        </div>
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
    selectedProduct: store.product.selected
    , productMap: store.product.byId
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(UpdateProduct)
);
