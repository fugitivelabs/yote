/*****

LIST REDUCERS GO HERE


*****/

import * as Actions from '../actions/postListActions';

function list(state = {
  isFetching: false
  , all: []
  , featured: []
  , published: []
  , pagination: {}
}, action) {
  switch (action.type) {
    case Actions.REQUEST_POST_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case Actions.RECEIVE_POST_LIST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , all: action.list
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , all: []
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case Actions.REQUEST_PUBLISHED_POST_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case Actions.RECEIVE_PUBLISHED_POST_LIST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , published: action.list
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , published: []
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case Actions.REQUEST_FEATURED_POST_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case Actions.RECEIVE_FEATURED_POST_LIST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , featured: action.list
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , featured: []
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    default:
      return state
  }
}

export default list;
