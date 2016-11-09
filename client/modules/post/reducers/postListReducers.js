/*****

LIST REDUCERS GO HERE


*****/

import { listActions, singleActions } from '../actions';

function list(state = {
  isFetching: false
  , didInvalidate: {
    all: false
    , featured: false
    , published: false
  }
  , all: []
  , allItemsMap: {}
  , featured: []
  , featuredMap: {}
  , published: []
  , publishedMap: {}
  , pagination: {}
  , pagination: {
    page: 1
    , per: 50
  }
  , lastUpdated: null
  , filter: ''
  , sortBy: 'name' // 'sort' is a reserved word, so use sortBy
  , query: ''
}, action) {
  switch (action.type) {
    case listActions.REQUEST_POST_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case listActions.RECEIVE_POST_LIST:
      if(action.success) {
        var newInvalidate = Object.assign({}, state.didInvalidate, {});
        newInvalidate["all"] = false;
        return Object.assign({}, state, {
          isFetching: false
          , didInvalidate: newInvalidate
          , all: action.list
          , allItemsMap: action.itemMap
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , all: []
          , allItemsMap: {}
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case listActions.REQUEST_PUBLISHED_POST_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case listActions.RECEIVE_PUBLISHED_POST_LIST:
      if(action.success) {
        var newInvalidate = Object.assign({}, state.didInvalidate, {});
        newInvalidate["published"] = false;
        return Object.assign({}, state, {
          isFetching: false
          , didInvalidate: newInvalidate
          , published: action.list
          , publishedMap: action.itemMap
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , published: []
          , publishedMap: {}
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case listActions.REQUEST_FEATURED_POST_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case listActions.RECEIVE_FEATURED_POST_LIST:
      if(action.success) {
        var newInvalidate = Object.assign({}, state.didInvalidate, {});
        newInvalidate["featured"] = false;
        return Object.assign({}, state, {
          isFetching: false
          , featured: action.list
          , featuredMap: action.itemMap
          , didInvalidate: newInvalidate
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , featured: []
          , featuredMap: {}
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case listActions.SET_POST_FILTER:
      return Object.assign({}, state, {
        filter: action.filter
      })

    case listActions.SET_POST_SORT:
      return Object.assign({}, state, {
        sortBy: action.sortBy
      })
    case listActions.SET_POST_QUERY:
      return Object.assign({}, state, {
        query: action.query
      })
    case listActions.SET_POST_PAGINATION:
      return Object.assign({}, state, {
        pagination: action.pagination
      })
    case listActions.INVALIDATE_POST_LIST:
      var newInvalidate = Object.assign({}, state.didInvalidate, {});
      newInvalidate[action.postType] = true;
      return Object.assign({}, state, {
        didInvalidate: newInvalidate
      })
    default:
      return state
  }
}

export default list;
