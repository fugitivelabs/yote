import { combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux';

//individual reducers
import user from './modules/user/reducers';
import post from './modules/post/reducers';
import product from './modules/product/reducers';
import statics from './modules/static/reducers';

const rootReducer = combineReducers({
  routeReducer
  , user
  , post
  , product
  , statics
  // next reducer
})

export default rootReducer
