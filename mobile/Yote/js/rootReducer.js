/**
 * rootReducer brings all application reducers and combines them as one
 */

// import primary libraries
import { combineReducers } from 'redux'

// import all resource reducers
import * as resourceReducers from './resources/resourceReducers.js';

const appReducer = combineReducers(resourceReducers);

// combine all the reducers
const rootReducer = (store, action) => {
  if(action.type === 'RECEIVE_LOGOUT') {
    // clear the store on logout
    console.log("clear store"); 
    store = undefined
  }
  return appReducer(store, action)
}

export default rootReducer;