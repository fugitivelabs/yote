import { combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux';

//individual reducers
import post from './modules/post/reducers';
import product from './modules/product/reducers';
import statics from './modules/static/reducers';

const rootReducer = combineReducers({
  routeReducer
  , post
  , product
  , statics
  // next reducer
})

export default rootReducer
