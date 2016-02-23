/*****

SINGLE REDUCERS GO HERE


*****/


// import * as singleActions from '../actions/productSingleActions';
import { singleActions } from '../actions';


function single(state = {
  isFetching: false
  , item: {}
  , populated: false
  , error: null
  , status: null //creating, editing
}, action) {
  switch(action.type) {
    case singleActions.REQUEST_SINGLE_PRODUCT:
      return Object.assign({}, state, {
        isFetching: true
        , item: {}
        , status: null
      })
      break;
    case singleActions.RECEIVE_SINGLE_PRODUCT:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.product
          , error: null
          , populated: false
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , error: action.error
          , populated: false
          , lastUpdated: action.receivedAt
        })
      }
      break;
    case singleActions.REQUEST_AND_POPULATE_SINGLE_PRODUCT:
      return Object.assign({}, state, {
        isFetching: true
        , item: {}
        , status: null
      })
      break;
    case singleActions.RECEIVE_POPULATED_SINGLE_PRODUCT:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.product
          , error: null
          , populated: true
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , error: action.error
          , populated: true
          , lastUpdated: action.receivedAt
        })
      }
      break;
    case singleActions.SETUP_NEW_PRODUCT:
      console.log("SETUP_NEW_PRODUCT");
      return Object.assign({}, state, {
        isFetching: false
        , item: {
          title: ""
          , description: ""
        }
        , populated: false
      });
      break;
    case singleActions.REQUEST_CREATE_PRODUCT:
      console.log("REQUEST_CREATE_PRODUCT");
      console.log(action);
      return Object.assign({}, state, {
        isFetching: true
        , item: action.product
        , status: 'creating'
      })
      break;
    case singleActions.RECEIVE_CREATE_PRODUCT:
      console.log("RECEIVE_CREATE_PRODUCT");
      console.log(action);
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.product
          , status: null
          , populated: false
          , error: null
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , status: null
          , populated: false
          , error: action.error
        })
      }
      break;
    case singleActions.REQUEST_UPDATE_PRODUCT:
      return Object.assign({}, state, {
        isFetching: true
        , item: action.product
        , status: 'updating'
      })
      break;
    case singleActions.RECEIVE_UPDATE_PRODUCT:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.product
          , status: null
          , populated: false
          , error: null
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , status: null
          , populated: false
          , error: action.error
        })
      }
      break;
    default:
      return state
  }
}

export default single;
