import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
// import * as listActions from '../actions/productListActions';
// import { listActions as productListActions } from '../actions';
import * as productActions from '../productActions';

// import components
import ProductListItem from './ProductListItem.js.jsx';

class ProductList extends Base {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // console.log("list mounting");
    // this.props.dispatch(productActions.fetchListIfNeeded("all"));
    this.props.dispatch(productActions.fetchList());
    this.props.dispatch(productActions.fetchList("workout"));
    this.props.dispatch(productActions.fetchList("section", "1234"));
    this.props.dispatch(productActions.fetchList("section", "3456", "78910")).then(() => {
      this.props.dispatch(productActions.invaldiateList("section", "3456", "78910"));
    });
  }

  render() {
    const { productList, productMap } = this.props;
    //note the new isEmpty. when the app loads, all "product lists" are null objects; they exist only after we created them
    const isEmpty = !productList || productList.items.length === 0 || productList.didInvalidate;
    console.log("isEmpty", isEmpty);
    return(
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h1> Product List
              <Link className="yt-btn small u-pullRight" to={'/products/new'}> NEW PRODUCT </Link>
            </h1>
            <hr/>
            {isEmpty
              ? (productList && productList.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              : <div style={{ opacity: productList.isFetching ? 0.5 : 1 }}>
                <ul>
                  {productList.items.map((id, i) =>
                    <ProductListItem key={i} product={productMap[id]} />
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
  return {
    productList: store.product.lists.all
    , productMap: store.product.byId
  }
}

export default connect(
  mapStoreToProps
)(ProductList);
