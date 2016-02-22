/*****

LIST REDUCERS GO HERE


*****/

import * as Actions from '../actions/postPopulatedActions';

function populated(state = {
  isFetching: false
  , item: {}
  , error: null
  , status: null //creating, editing
}, action) {
  switch(action.type){
    case Actions.REQUEST_AND_POPULATE_SINGLE_POST:
      return Object.assign({}, state, {
        isFetching: true
        , item: {}
        , status: null
      })
    case Actions.RECEIVE_POPULATED_SINGLE_POST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case Actions.REQUEST_AND_POPULATE_SINGLE_POST_BY_SLUG:
      return Object.assign({}, state, {
        isFetching: true
        , item: {}
        , status: null
      })
    case Actions.RECEIVE_POPULATED_SINGLE_POST_BY_SLUG:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    default:
      return state
  }
}

export default populated;
