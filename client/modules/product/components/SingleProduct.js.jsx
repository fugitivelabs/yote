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
    dispatch(productActions.fetchSingleProductById(params.productId))
  }

  render() {
    const { selected, map } = this.props;
    const isEmpty = (!selected.id || !map[selected.id] || map[selected.id].title === undefined);
    // const isEmpty = (item.title === null || item.title === undefined);
    console.log("isEmpty", isEmpty);
    return  (
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h3> Single Product Item </h3>
            {isEmpty
              ? (selected.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                : <div style={{ opacity: selected.isFetching ? 0.5 : 1 }}>

                  <h1> { map[selected.id].title }
                    <Link className="yt-btn small u-pullRight" to={`/products/${map[selected.id]._id}/update`}> UPDATE PRODUCT </Link>
                  </h1>
                  <hr/>
                  <p> {map[selected.id].description }</p>
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
    selected: store.product.selected
    , map: store.product.map
  }
}

export default connect(
  mapStoreToProps
)(SingleProduct);
