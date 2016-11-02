import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

// import actions
import { singleActions, listActions } from '../actions';


// import components
import ProductForm from './ProductForm.js.jsx';

class CreateProduct extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(singleActions.setupNewProduct())
    // this.props.dispatch(singleActions.setupNewProduct()).then(() =>{
    //     console.log(this.props);
    //   });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    // console.log("NExt PROPs");
    // console.log(nextProps);
    if(nextProps.status === "error") {
      alert(nextProps.error.message);
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
    this.props.dispatch(singleActions.sendCreateProduct(this.state.item)).then((res) => {
      if(res.success) {
        this.props.dispatch(listActions.invaldiateList());
        browserHistory.push(`/products/${res.product._id}`)
      } else {
        console.log("Response Error:");
        console.log(res);
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
  // console.log("State");
  // console.log(state);
  return {
    item: store.product.single.item
    , status: store.product.single.status
  }
}

export default connect(
  mapStoreToProps
)(CreateProduct);
