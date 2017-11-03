/**
 * Generic product list view. Defaults to 'all' with:
 * this.props.dispatch(productActions.fetchListIfNeeded());
 *
 * NOTE: More list examples are:
 * this.props.dispatch(productActions.fetchListIfNeeded("all"));
 * this.props.dispatch(productActions.fetchListIfNeeded()).then((data) => {
 *   console.log("DATA", data);
 * });
 * this.props.dispatch(productActions.fetchListIfNeeded("_workout"));
 * this.props.dispatch(productActions.fetchListIfNeeded("_section", "1234"));
 * this.props.dispatch(productActions.fetchList("_section", "3456", "78910")).then(() => {
 *   this.props.dispatch(productActions.invalidateList("_section", "3456", "78910"));
 * });
 * this.props.dispatch(productActions.setFilter({test: 2}));
 * this.props.dispatch(productActions.setFilter({test: 2}, "_section", "1234"));
 * this.props.dispatch(productActions.setPagination({test: 1}, "_section", "1234"));
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

// import product components
import ProductListItem from './ProductListItem.js.jsx';

// import product css modules
import productStyles from '../productModuleStyles.css';

class ProductList extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch a list of your choice
    this.props.dispatch(productActions.fetchListIfNeeded()); // defaults to 'all'
  }

  render() {
    const { productStore } = this.props;

    /**
     * Retrieve the list information and the list items for the component here.
     *
     * NOTE: if the list is deeply nested and/or filtered, you'll want to handle
     * these steps within the mapStoreToProps method prior to delivering the
     * props to the component.  Othwerwise, the render() action gets convoluted
     * and potentially severely bogged down.
     */

    // get the productList meta info here so we can reference 'isFetching'
    const productList = productStore.lists ? productStore.lists.all : null;

    /**
     * use the reducer getList utility to convert the all.items array of ids
     * to the actual product objetcs
     */
    const productListItems = productStore.util.getList("all");

    /**
     * NOTE: isEmpty is is usefull when the component references more than one
     * resource list.
     */
    const isEmpty = !productListItems || !productList;

    return (
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h1> Product List
              <Link className="yt-btn small u-pullRight" to={'/products/new'}> NEW PRODUCT </Link>
            </h1>
            <hr/>
            { isEmpty ?
              (productListItems && productList && productList.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              :
              <div style={{ opacity: productList.isFetching ? 0.5 : 1 }}>
                <ul styleName="product-list">
                  {productListItems.map((product, i) =>
                    <ProductListItem key={product._id + i} product={product} />
                  )}
                </ul>
              </div>
            }
          </div>
        </section>
      </div>
    )
  }
}

ProductList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    productStore: store.product
  }
}

export default withRouter(
    connect(
    mapStoreToProps
  )(ProductList)
);
