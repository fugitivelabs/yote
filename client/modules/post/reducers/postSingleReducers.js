/*****

LIST REDUCERS GO HERE


*****/

import { combineReducers } from 'redux';
import * as Actions from '../actions/postSingleActions';

function single(state = {
  isFetching: false
  , item: {}
  , error: null
  , status: null //creating, editing
}, action) {
  switch(action.type) {
    case Actions.REQUEST_SINGLE_POST:
      return Object.assign({}, state, {
        isFetching: true
        , item: {}
        , status: null
      })
      break;
    case Actions.RECEIVE_SINGLE_POST:
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
      break;
    case Actions.REQUEST_AND_POPULATE_SINGLE_POST:
      return Object.assign({}, state, {
        isFetching: true
        , item: {}
        , status: null
      })
      break;
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
      break;
    case Actions.REQUEST_SINGLE_POST_BY_SLUG:
      return Object.assign({}, state, {
        isFetching: true
        , item: {}
        , status: null
      })
      break;
    case Actions.RECEIVE_SINGLE_POST_BY_SLUG:
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
      break;
    case Actions.SETUP_NEW_POST:
      console.log("SETUP_NEW_POST");
      return Object.assign({}, state, {
        isFetching: false
        , item: {
          title: ""
          , content: ""
        }
      });
      break;
    case Actions.REQUEST_CREATE_POST:
      console.log("REQUEST_CREATE_POST");
      console.log(action);
      return Object.assign({}, state, {
        isFetching: true
        , item: action.post
        , status: 'creating'
      })
      break;
    case Actions.RECEIVE_CREATE_POST:
      console.log("RECEIVE_CREATE_POST");
      console.log(action);
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , status: null
          , error: null
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , status: null
          , error: action.error
        })
      }
      break;
    case Actions.REQUEST_UPDATE_POST:
      return Object.assign({}, state, {
        isFetching: true
        , item: action.post
        , status: 'updating'
      })
      break;
    case Actions.RECEIVE_UPDATE_POST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , status: null
          , error: null
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , status: null
          , error: action.error
        })
      }
      break;
    default:
      return state
  }
}

export default single;
