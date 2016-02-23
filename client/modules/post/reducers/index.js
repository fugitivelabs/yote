import { combineReducers } from 'redux';

// import reducers
import list from './postListReducers';
import single from './postSingleReducers';

const postReducer = combineReducers({
  list
  , single
});

export default postReducer;
