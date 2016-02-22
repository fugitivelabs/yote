/*****

SINGLE REDUCERS GO HERE


*****/


import * as Actions from '../actions/productSingleActions';

function single(state = {
  isFetching: false
  , item: {}
  , error: null
  , status: null //creating, editing
}, action) {
  switch(action.type) {
    case Actions.REQUEST_SINGLE_PRODUCT:
      return Object.assign({}, state, {
        isFetching: true
        , item: {}
        , status: null
      })
    case Actions.RECEIVE_SINGLE_PRODUCT:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.product
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

    case Actions.SETUP_NEW_PRODUCT:
      console.log("SETUP_NEW_PRODUCT");
      return Object.assign({}, state, {
        isFetching: false
        , item: {
          title: ""
          , description: ""
        }
      });
    case Actions.REQUEST_CREATE_PRODUCT:
      console.log("REQUEST_CREATE_PRODUCT");
      console.log(action);
      return Object.assign({}, state, {
        isFetching: true
        , item: action.product
        , status: 'creating'
      })
    case Actions.RECEIVE_CREATE_PRODUCT:
      console.log("RECEIVE_CREATE_PRODUCT");
      console.log(action);
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.product
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
    case Actions.REQUEST_UPDATE_PRODUCT:
      return Object.assign({}, state, {
        isFetching: true
        , item: action.product
        , status: 'updating'
      })
    case Actions.RECEIVE_UPDATE_PRODUCT:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.product
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
    default:
      return state
  }
}

export default single;
