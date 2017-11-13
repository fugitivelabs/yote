/**
 * rootReducer brings all application reducers and combines them as one 
 */


// import primary libraries
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

// import all other module reducers
import * as moduleReducers from './modules/moduleReducers.js';


const routesToCombine = Object.assign(
  {}
  , {
    routing: routerReducer
  }
  , moduleReducers
);

// combine all the reducers into one
const rootReducer = combineReducers(routesToCombine);

export default rootReducer;
