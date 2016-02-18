/*****

SINGLE ITEM REDUCERS GO HERE

*****/


import * as singleActions from '../actions/single';



function single(state = {
  isFetching: false
  , item: {}
  // , status: {
  //   lastUpdated: Date.now()
  //   , isUpdating: false
  // }
}, action) {
  switch (action.type) {
    case singleActions.REQUEST_SINGLE_NEWS_ITEM:
      console.log("REQUEST_SINGLE_NEWS_ITEM")
      console.log(action);
      return Object.assign({}, state, {
        isFetching: true
      })
      break;
    case singleActions.RECEIVE_SINGLE_NEWS_ITEM:
      console.log("RECEIVE_SINGLE_NEWS_ITEM");
      // console.log(action);
      return Object.assign({}, state, {
        isFetching: false
        , item: action.item
      })
      break;

    default:
      return state
  }
}

export default single;
