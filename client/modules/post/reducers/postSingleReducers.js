/*****

SINGLE REDUCERS GO HERE


*****/

import { singleActions } from '../actions';

let defaultPost = {
  title: ""
  , content: ""
  , featured: false
  , status: 'draft'
  , tags: []
}

function single(state = {
  isFetching: false
  , item: {}
  , populated: false
  , error: null
  , status: null //creating, editing
}, action) {
  switch(action.type) {
    case singleActions.REQUEST_SINGLE_POST:
      return Object.assign({}, state, {
        isFetching: true
        // , item: {}
        , status: null
      })
    case singleActions.RECEIVE_SINGLE_POST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , populated: false
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , populated: false
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case singleActions.REQUEST_SINGLE_POST_BY_SLUG:
      return Object.assign({}, state, {
        isFetching: true
        // , item: {}
        , status: null
      })
    case singleActions.RECEIVE_SINGLE_POST_BY_SLUG:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , populated: false
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , populated: false
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case singleActions.REQUEST_AND_POPULATE_SINGLE_POST:
      return Object.assign({}, state, {
        isFetching: true
        // , item: {}
        , status: null
      })
    case singleActions.RECEIVE_POPULATED_SINGLE_POST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , populated: true
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , populated: true
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case singleActions.REQUEST_AND_POPULATE_SINGLE_POST_BY_SLUG:
      return Object.assign({}, state, {
        isFetching: true
        // , item: {}
        , status: null
      })
    case singleActions.RECEIVE_POPULATED_SINGLE_POST_BY_SLUG:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , populated: true
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , populated: true
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }

    case singleActions.SETUP_NEW_POST:
      console.log("SETUP_NEW_POST");
      return Object.assign({}, state, {
        isFetching: false
        , item:  JSON.parse(JSON.stringify(defaultPost))
        , populated: false
      });
    case singleActions.REQUEST_CREATE_POST:
      console.log("REQUEST_CREATE_POST");
      console.log(action);
      return Object.assign({}, state, {
        isFetching: true
        , item: action.post
        , status: 'creating'
      })
    case singleActions.RECEIVE_CREATE_POST:
      console.log("RECEIVE_CREATE_POST");
      console.log(action);
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , populated: false
          , status: null
          , error: null
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , populated: false
          , status: null
          , error: action.error
        })
      }
    case singleActions.REQUEST_UPDATE_POST:
      return Object.assign({}, state, {
        isFetching: true
        , item: action.post
        , status: 'updating'
      })
    case singleActions.RECEIVE_UPDATE_POST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , populated: false
          , status: null
          , error: null
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , populated: false
          , status: null
          , error: action.error
        })
      }
    default:
      return state
  }
}

export default single;
