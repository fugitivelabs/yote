import { combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux';

//individual reducers
import post from './modules/post/reducers';
import product from './modules/product/reducers';

const rootReducer = combineReducers({
  routeReducer
  , post
  , product
  // next reducer
})

export default rootReducer
