/*****

LIST REDUCERS GO HERE


*****/

import { combineReducers } from 'redux';
import * as listActions from '../actions/list';



function list(state = {
  isFetching: false
  , items: []
  , pagination: {}
}, action) {
  switch (action.type) {
    case listActions.REQUEST_NEWS_LIST:
      console.log("REQUEST_NEWS")
      return Object.assign({}, state, {
        isFetching: true
      })
      break;
    case listActions.RECEIVE_NEWS_LIST:
      console.log("RECEIVE_NEWS");
      console.log(action);
      return Object.assign({}, state, {
        isFetching: false
        , items: action.list
      })
      break;

    default:
      return state
  }
}

export default list;
