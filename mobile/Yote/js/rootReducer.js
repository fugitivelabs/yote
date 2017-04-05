
/**
 * rootReducer brings all application reducers and combines them as one
 */

// import primary libraries
import { combineReducers } from 'redux'

// import all module reducers
import * as moduleReducers from './modules/moduleReducers.js';

const appReducer = combineReducers(moduleReducers);

// combine all the reducers
const rootReducer = (store, action) => {
  if(action.type === 'RECEIVE_LOGOUT') {
    // clear the store on logout
    store = undefined
  }
  return appReducer(store, action)
}

export default rootReducer;
