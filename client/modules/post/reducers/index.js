import { combineReducers } from 'redux';

// import reducers
import list from './postListReducers';
import single from './postSingleReducers';
import populated from './postPopulatedReducers';

const postReducer = combineReducers({
  list
  , single
  , populated
});

export default postReducer;
