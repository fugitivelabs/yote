import { combineReducers } from 'redux'
import * as Actions from './postActions'
//define initial state

//get list
function list(state = {
  isFetching: false
  , items: []
  , error: null
  , pagination: {}
}, action) {
  switch(action.type) {
    case Actions.REQUEST_ALL_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case Actions.RECEIVE_ALL_POSTS:
      //do different things based on action status
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , items: action.posts
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
    default:
      return state
  }
}
//get single
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
    case Actions.REQUEST_CREATE_POST:
      return Object.assign({}, state, {
        isFetching: true
        , item: action.post
        , status: 'editing'
      })
    case Actions.RECEIVE_CREATE_POST:
      if(action.success) {
        Object.assign({}, state, {
          isFetching: false
          , item: action.post
          , status: null
          , error: null
        })
      } else {
        Object.assign({}, state, {
          isFetching: false
          , item: {}
          , status: null
          , error: action.error
        })
      }
      case Actions.REQUEST_UPDATE_POST:
        return Object.assign({}, state, {
          isFetching: true
          , item: action.post
          , status: 'updating'
        })
      case Actions.RECEIVE_UPDATE_POST:
        if(action.success) {
          Object.assign({}, state, {
            isFetching: false
            , item: action.post
            , status: null
            , error: null
          })
        } else {
          Object.assign({}, state, {
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

const postRootReducer = combineReducers({
  //things get trickier once we have multiple post reducers
  list
  , single
})

export default postRootReducer
