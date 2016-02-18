import { combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux';

//individual reducers
import posts from './modules/post2/PostReducers'
import news from './modules/news/reducers';

const rootReducer = combineReducers({
  routeReducer
  , posts
  , news
  // next reducer
})

export default rootReducer
