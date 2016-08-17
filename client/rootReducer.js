import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

//individual reducers
// import user from './modules/user/reducers';
// import post from './modules/post/reducers';
// import product from './modules/product/reducers';
import statics from './modules/static/reducers';

var routesToCombine = Object.assign(
  {}
  , {
    routing: routerReducer
    , statics
  }
  , moduleReducers
);

const rootReducer = combineReducers(routesToCombine);
// const rootReducer = combineReducers({
//   routing: routerReducer
//   , statics
//   , user
//   , post
//   , product
//   // next reducer
// })

export default rootReducer

import * as moduleReducers from './modules/moduleReducers.js';