import { combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux';

//individual reducers
import post from './modules/post/reducers';
import news from './modules/news/reducers';

const rootReducer = combineReducers({
  routeReducer
  , post
  , news
  // next reducer
})

export default rootReducer
