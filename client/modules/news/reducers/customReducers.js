/*****

CUSTOM REDUCERS GO HERE

i.e. non-CRUD reducers ke toggling tabs or filters

*****/

import { combineReducers } from 'redux';
import * as CustomActions from '../actions/customActions';


const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}


const customReducers = combineReducers({
  visibilityFilter
});

export default customReducers
