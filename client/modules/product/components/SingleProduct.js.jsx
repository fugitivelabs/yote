import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import * as singleActions from '../actions/productSingleActions';

class SingleProduct extends Base {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    console.log("Single item mounting");
    // console.log(this.context);

    // action.fetchItem();
    const populate = true;
    // const populate = false;
    const { dispatch, params } = this.props;
    dispatch(singleActions.fetchSingleProductById(params.productId, populate ))
  }

  render() {
    const { item } = this.props;
    const isEmpty = !item;
    console.log("isEmpty", isEmpty);
    return  (
      <div className="yt-container">
        <h3> Single Product Item </h3>
        {isEmpty
          ? (item.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: item.isFetching ? 0.5 : 1 }}>

              <h1> { item.title }
                <Link className="yt-btn small u-pullRight" to={`/products/${item._id}/update`}> UPDATE PRODUCT </Link>
              </h1>
              <hr/>
              <p> {item.description }</p>
            </div>
          }
      </div>
    )
  }
}

SingleProduct.propTypes = {
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
)(SingleProduct);
