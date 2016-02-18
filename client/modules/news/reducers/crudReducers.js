/*****

BOILERPLATE CRUD REDUCERS GO HERE

*****/

import { combineReducers } from 'redux';
import * as CrudActions from '../actions/crudActions';



function list(state = {
  isFetching: false
  , items: []
  , pagination: {}
}, action) {
  switch (action.type) {
    case CrudActions.REQUEST_NEWS:
      console.log("REQUEST_NEWS")
      return Object.assign({}, state, {
        isFetching: true
      })
      break;
    case CrudActions.RECEIVE_NEWS:
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


const crudReducers = combineReducers({
  list
});


export default crudReducers;
