import { combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux';

//individual reducers
import post from './modules/post/reducers';

const rootReducer = combineReducers({
  routeReducer
  , post
  // next reducer
})

export default rootReducer
