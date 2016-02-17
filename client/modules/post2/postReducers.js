import { combineReducers } from 'redux'
import {
  REQUEST_ALL_POSTS
  , RECEIVE_ALL_POSTS
} from './postActions'
//define initial state


//reducers
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

const postRootReducer = combineReducers({
  //things get trickier once we have multiple post reducers
  list
})

export default postRootReducer
