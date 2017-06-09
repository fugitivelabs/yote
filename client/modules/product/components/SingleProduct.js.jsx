/**
 * Displays a single product from the 'byId' map in the product reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import * as productActions from '../productActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

class SingleProduct extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(productActions.fetchSingleIfNeeded(params.productId));
  }

  render() {
    const { product } = this.props;
    // console.log("PRODUCT!!", product);
    // console.log("SELECTED PRODUCT", selectedProduct);
    // // let product = product2.getSelectedItem()
    // let product = selectedProduct.getItem()
    const isEmpty = !product || !product._id;
    // // const isEmpty = selectedProduct && selectedProduct.virtual//(!selectedProduct.id || !productMap[selectedProduct.id] || productMap[selectedProduct.id].title === undefined || selectedProduct.didInvalidate);
    // console.log("TEST", isEmpty);
    // if(selectedProduct && selectedProduct.virtual) {
    //   console.log("TEST 2");
    //   console.log(selectedProduct.virtual());
    //   // console.log(selectedProduct.virtual()._id);

    //   // const product = this.props[selectedProduct]
    //   console.log("PRODUCT 2", product);
    // }

    return (
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h3> Single Product </h3>
            {/*{isEmpty ?
              (selectedProduct.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              :
              <div style={{ opacity: selectedProduct.isFetching ? 0.5 : 1 }}>
                <h1> { productMap[selectedProduct.id].title }
                  <Link className="yt-btn small u-pullRight" to={`/products/${productMap[selectedProduct.id]._id}/update`}> UPDATE PRODUCT </Link>
                </h1>
                <hr/>
                <p> {productMap[selectedProduct.id].description }</p>
              </div>
            }*/}
            {isEmpty ?
              <h2>Empty.</h2>
              :
              <div>
                <h1> { product.title }
                  <Link className="yt-btn small u-pullRight" to={`/products/${product._id}/update`}> UPDATE PRODUCT </Link>
                </h1>
                <hr/>
                <p> {product.description }</p>
              </div>
            }
          </div>
        </section>
      </div>
    )
  }
}

SingleProduct.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    product: store.product.selected.getItem()
  }
}

export default connect(
  mapStoreToProps
)(SingleProduct);
