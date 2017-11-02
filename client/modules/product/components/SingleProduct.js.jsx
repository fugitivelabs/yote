/**
 * Displays a single product from the 'byId' map in the product reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as productActions from '../productActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

class SingleProduct extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(productActions.fetchSingleIfNeeded(match.params.productId));
  }

  render() {
    const { selectedProduct, productMap } = this.props;
    const isEmpty = (!selectedProduct.id || !productMap[selectedProduct.id] || productMap[selectedProduct.id].title === undefined || selectedProduct.didInvalidate);
    return (
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h3> Single Product </h3>
            {isEmpty ?
              (selectedProduct.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              :
              <div style={{ opacity: selectedProduct.isFetching ? 0.5 : 1 }}>
                <h1> { productMap[selectedProduct.id].title }
                  <Link className="yt-btn small u-pullRight" to={`${this.props.match.url}/update`}> UPDATE PRODUCT </Link>
                </h1>
                <hr/>
                <p> {productMap[selectedProduct.id].description }</p>
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
    selectedProduct: store.product.selected
    , productMap: store.product.byId
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(SingleProduct)
);
