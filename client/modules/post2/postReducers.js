import { combineReducers } from 'redux'
import {
  REQUEST_ALL_POSTS
  , RECEIVE_ALL_POSTS
  , REQUEST_SINGLE_POST
  , RECEIVE_SINGLE_POST
} from './postActions'
//define initial state

//get list
function list(state = {
  isFetching: false
  , items: []
  , pagination: {}
}, action) {
  switch(action.type) {
    case REQUEST_ALL_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_ALL_POSTS:
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
  //editting? status?
}, action) {
  switch(action.type) {
    case REQUEST_SINGLE_POST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_SINGLE_POST:
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
          , item: null
          , error: action.error
          , lastUpdated: action.receivedAt
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
