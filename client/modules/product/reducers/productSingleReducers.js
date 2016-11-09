/*****

SINGLE REDUCERS GO HERE


*****/


// import * as singleActions from '../actions/productSingleActions';
import { singleActions } from '../actions';

let defaultProduct = {
  title: ""
  , description: ""
}

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
        // , item: {} // when transitioning within states where this is already populate -- i.e. from 'Single' to 'Update', this forces a refresh on the element, which isn't desirable.  Also, retrieve error is handled below, so this shouldn't be necessary even when calling new instances
        , status: null
      })
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
    case singleActions.REQUEST_AND_POPULATE_SINGLE_PRODUCT:
      return Object.assign({}, state, {
        isFetching: true
        // , item: {} // see above
        , status: null
      })
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
    case singleActions.SETUP_NEW_PRODUCT:
      console.log("SETUP_NEW_PRODUCT");
      return Object.assign({}, state, {
        isFetching: false
        , item:  JSON.parse(JSON.stringify(defaultProduct)) //copy object
        , populated: false
      });
    case singleActions.REQUEST_CREATE_PRODUCT:
      console.log("REQUEST_CREATE_PRODUCT");
      console.log(action);
      return Object.assign({}, state, {
        isFetching: true
        , item: action.product
        , status: 'creating'
      })
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
    case singleActions.REQUEST_UPDATE_PRODUCT:
      return Object.assign({}, state, {
        isFetching: true
        , item: action.product
        , status: 'updating'
      })
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
    case singleActions.REQUEST_DELETE_PRODUCT:
      return Object.assign({}, state, {
        isFetching: true
        , status: 'deleting'
      })
    case singleActions.RECEIVE_DELETE_PRODUCT:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , status: null
          , populated: false
          , error: null
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , status: null
          , populated: false
          , error: action.error
        })
      }
    default:
      return state
  }
}

export default single;
