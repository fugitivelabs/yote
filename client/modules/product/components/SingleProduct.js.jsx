import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as productActions from '../productActions';

class SingleProduct extends Base {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(productActions.fetchSingleIfNeeded(params.productId))
    
    // this.props.dispatch(productActions.fetchListIfNeeded("all"));
    this.props.dispatch(productActions.fetchListIfNeeded());
    this.props.dispatch(productActions.fetchListIfNeeded("workout"));
    // this.props.dispatch(productActions.fetchListIfNeeded("section", "1234"));
    // this.props.dispatch(productActions.fetchList("section", "3456", "78910")).then(() => {
    //   this.props.dispatch(productActions.invaldiateList("section", "3456", "78910"));
    // });
    // this.props.dispatch(productActions.setFilter({test: 2}));
    // this.props.dispatch(productActions.setFilter({test: 2}, "section", "1234"));
    // this.props.dispatch(productActions.setPagination({test: 1}, "section", "1234"));

  }

  render() {
    const { selectedProduct, productMap } = this.props;
    const isEmpty = (!selectedProduct.id || !productMap[selectedProduct.id] || productMap[selectedProduct.id].title === undefined);
    // const isEmpty = (item.title === null || item.title === undefined);
    console.log("isEmpty", isEmpty);
    return  (
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h3> Single Product Item </h3>
            {isEmpty
              ? (selectedProduct.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                : <div style={{ opacity: selectedProduct.isFetching ? 0.5 : 1 }}>

                  <h1> { productMap[selectedProduct.id].title }
                    <Link className="yt-btn small u-pullRight" to={`/products/${productMap[selectedProduct.id]._id}/update`}> UPDATE PRODUCT </Link>
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
  return {
    selectedProduct: store.product.selected
    , productMap: store.product.byId
  }
}

export default connect(
  mapStoreToProps
)(SingleProduct);
