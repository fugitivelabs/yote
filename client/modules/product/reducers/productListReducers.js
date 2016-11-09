/*****

LIST REDUCERS GO HERE


*****/

import  { listActions } from '../actions';

//NOTES: eventually we'd like to remove the different reducers and just have a single productReducer.
// with the maps, we can just find the "single" one by storing it's _id. create/update/delete also happen by the _id.
// we should also get rid of "populate" actions. instead of having to check if things are populated at ever turn,
// we can instead just check the _id of the item and the relevant map and request if it it's needed.
// finally, we can reduce server calls when moving between pages. if the map already has an entry for
// _id == xx, and lastUpdated is less than a few minutes, don't fetch anything.

function list(state = {
  isFetching: false
  , didInvalidate: false
  , items: []
  , itemMap: {}
  , lastUpdated: null
  , pagination: {}
  , filter: ''
  , sortBy: 'name' // 'sort' is a reserved word, so use sortBy
  , query: ''
  // , params: {} //object that we will use to filter down the list
  // , current: null //object id of the current one we are viewing
}, action) {
  switch (action.type) {
    case listActions.REQUEST_PRODUCT_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case listActions.RECEIVE_PRODUCT_LIST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , items: action.list
          , didInvalidate: false
          , itemMap: action.itemMap
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , items: []
          , didInvalidate: true
          , itemMap: {}
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }

    case listActions.SET_PRODUCT_FILTER:
      return Object.assign({}, state, {
        filter: action.filter
      })

    case listActions.SET_PRODUCT_SORT:
      return Object.assign({}, state, {
        sortBy: action.sortBy
      })
    case listActions.SET_PRODUCT_QUERY:
      return Object.assign({}, state, {
        query: action.query
      })
    case listActions.SET_PRODUCT_PAGINATION:
      return Object.assign({}, state, {
        pagination: action.pagination
      })
    case listActions.INVALIDATE_PRODUCT_LIST:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    default:
      return state
  }
}

export default list;
