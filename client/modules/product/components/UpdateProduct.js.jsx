import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import * as singleActions from '../actions/productSingleActions';

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
    //this works WAY better than having a separate onChange for every input box
    // just make sure input name attr == state name
    var newProductState = this.state.item;
    newProductState[e.target.name] = e.target.value;
    newProductState.status = newProductState.isPublished ? "published" : "draft";
    this.setState(newProductState);

  }

  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(singleActions.sendUpdateProduct(this.state.item));
  }

  render() {
    const { item } = this.state;
    const isEmpty = !item;
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

const mapStateToProps = (state) => {
  // console.log("State");
  // console.log(state);
  return {
    item: state.product.single.item
  }
}

export default connect(
  mapStateToProps
)(UpdateProduct);
