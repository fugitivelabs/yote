import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import _ from 'lodash';

// import actions
import { singleActions } from '../actions';

// import components
import ProductForm from './ProductForm.js.jsx';

class UpdateProduct extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentWillMount() {
    console.log("Single item mounting");
    // console.log(this.context);

    // action.fetchItem();
    const populate = false;
    // const populate = false;
    const { dispatch, params } = this.props;
    if(params.productId) {
      dispatch(singleActions.fetchSingleProductById(params.productId, populate ))
    } else {
      dispatch(singleActions.fetchSingleProductBySlug(params.slug))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
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
    this.props.dispatch(singleActions.sendUpdateProduct(this.state.item));
  }

  render() {
    const { item } = this.state;
    const isEmpty = !item.title; //check a property to make sure that it resolved.
    return  (
      <div >
        {isEmpty
          ? <h2> Loading...</h2>
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
  // console.log("State");
  // console.log(state);
  return {
    item: store.product.single.item
  }
}

export default connect(
  mapStoreToProps
)(UpdateProduct);
