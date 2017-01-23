import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

// import actions
// import { singleActions, listActions } from '../actions';

import * as productActions from '../productActions';

// import components
import ProductForm from './ProductForm.js.jsx';

class CreateProduct extends Base {
  constructor(props) {
    super(props);
    this.state = {
      item: JSON.parse(JSON.stringify(this.props.defaultItem))
      //don't want to actually change the store's defaultItem, just use a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentDidMount() {
    const { dispatch } = this.props;
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
    this.props.dispatch(productActions.sendCreateProduct(this.state.item)).then((action) => {
      // console.log("HANDLE SUBMIT");
      // console.log(action);
      if(action.success) {
        // this.props.dispatch(listActions.invaldiateList());
        browserHistory.push(`/products/${action.item._id}`)
      } else {
        console.log("Response Error:");
        console.log(action.error);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { item } = this.state;
    const isEmpty = (item.title === null || item.title === undefined);
    return  (
      <div>

        {isEmpty
          ? <h2> Loading...</h2>
        : <ProductForm
            product={item}
            formType="create"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink="/products"
            formTitle="Create Product"
            />
        }
      </div>
    )
  }
}

CreateProduct.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  // console.log("Store");
  // console.log(store);
  return {
    defaultItem: store.product.defaultItem
    , selected: store.product.selected
    , map: store.product.map
  }
}

export default connect(
  mapStoreToProps
)(CreateProduct);
