import React, { Component, PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import * as singleActions from '../actions/single';
import * as updateActions from '../actions/update';

// // import components
// import SingleItem from '../components/SingleItem.js.jsx';


class Update extends Base {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    console.log("Update item mounting");
    // console.log(this.context);

    // action.fetchItem();
    const populate = true;
    // const populate = false;
    const { dispatch, params } = this.props;
    if(params.postId) {
      dispatch(singleActions.fetchSingleNewsItemById(params.postId, populate ))
    } else {
      dispatch(singleActions.fetchSingleNewsItemBySlug(params.slug, populate))
    }
  }

  render() {
    const { item } = this.props;
    const isEmpty = !item;
    console.log("isEmpty", isEmpty);
    return  (
      <div>
        <h3> Update News Item </h3>
        {isEmpty
          ? (item.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: item.isFetching ? 0.5 : 1 }}>

              <h1> { item.title } </h1>
              <p> {item.content }</p>
            </div>
          }
      </div>
    )
  }
}

Update.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  // console.log("State");
  // console.log(state);
  return {
    item: state.news.single.item
  }
}

export default connect(
  mapStateToProps
)(Update);
