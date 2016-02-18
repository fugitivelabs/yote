import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

//individual reducers
import posts from './modules/post2/PostReducers'
//users

const rootReducer = combineReducers({
  routeReducer
  , posts
  // , users
})

export default rootReducer
