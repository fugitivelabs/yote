import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

//individual reducers
import user from './modules/user/reducers';
import post from './modules/post/reducers';
import product from './modules/product/reducers';
import statics from './modules/static/reducers';

const rootReducer = combineReducers({
  routing: routerReducer
  , user
  , post
  , product
  , statics
  // next reducer
})

export default rootReducer
