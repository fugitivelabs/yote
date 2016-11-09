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
    this.props.dispatch(productActions.fetchListIfNeeded("all"));
  }

  render() {
    const { list, map } = this.props;
    const isEmpty = list.items.length === 0;
    return(
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h1> Product List
              <Link className="yt-btn small u-pullRight" to={'/products/new'}> NEW PRODUCT </Link>
            </h1>
            <hr/>
            {isEmpty
              ? (list.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                : <div style={{ opacity: list.isFetching ? 0.5 : 1 }}>
                  <ul>
                    {list.items.map((id, i) =>
                      <ProductListItem key={i} product={map[id]} />
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
    map: store.product.map
    , list: store.product.lists.all
  }
}

export default connect(
  mapStoreToProps
)(ProductList);
