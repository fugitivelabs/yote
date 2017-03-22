/**
 * Combine and export all individual static reducers (contact form, etc.)
 */

import { combineReducers } from 'redux';

// import individual reducers
import contact from './contactReducer';

// now combine them into one staticReducer
const staticReducer = combineReducers({
  contact
});

export default staticReducer;
