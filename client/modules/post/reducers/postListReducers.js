/*****

LIST REDUCERS GO HERE


*****/

import { combineReducers } from 'redux';
import * as Actions from '../actions/postListActions';



function list(state = {
  isFetching: false
  , items: []
  , pagination: {}
}, action) {
  switch (action.type) {
    case Actions.REQUEST_POST_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
      break;
    case Actions.RECEIVE_POST_LIST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , items: action.list
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , items: []
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
      break;

    default:
      return state
  }
}

export default list;
