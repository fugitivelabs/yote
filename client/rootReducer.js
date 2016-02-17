import { combineReducers } from 'redux'

//individual reducers
import posts from './modules/post2/PostReducers'

const rootReducer = combineReducers({
  posts
})

export default rootReducer
