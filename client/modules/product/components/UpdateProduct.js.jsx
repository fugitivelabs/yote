import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import * as productActions from '../productActions';

// import components
import ProductForm from './ProductForm.js.jsx';

class UpdateProduct extends Base {
  constructor(props) {
    super(props);
    const { selectedProduct, productMap } = this.props;
    this.state = {
      item: productMap[selectedProduct.id] ? JSON.parse(JSON.stringify(productMap[selectedProduct.id])) : {}      
      //we don't want to change the store, just make changes to a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    console.log("Single item mounting");
    const { dispatch, params } = this.props;
    dispatch(productActions.fetchSingleIfNeeded(params.productId))
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProduct, productMap } = nextProps;
    this.state = {
      item: productMap[selectedProduct.id] ? JSON.parse(JSON.stringify(productMap[selectedProduct.id])) : {}
      //we don't want to actually change the store's item, just use a copy
    }
  }

  _handleFormChange(e) {
    var newState = _.update( this.state.item, e.target.name, function() {
      return e.target.value;
    });
    this.setState(newState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(productActions.sendUpdateProduct(this.state.item)).then((action) => {
      console.log(action);
      if(action.success) {
        browserHistory.push(`/products/${action.item._id}`)
      } else {
        console.log("Response Error:");
        console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { selectedProduct, productMap } = this.props;
    const { item } = this.state;
    const isEmpty = (!item || item.title === null || item.title === undefined);
    return  (
      <div >
        {isEmpty
          ? (selectedProduct.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
        : <ProductForm
            product={item}
            formType="update"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink={`/products/${item._id}`}
            formTitle="Update Product"
          />
        }
      </div>
    )
  }
}

UpdateProduct.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    selectedProduct: store.product.selected
    , productMap: store.product.byId
  }
}

export default connect(
  mapStoreToProps
)(UpdateProduct);
