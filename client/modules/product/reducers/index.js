import { combineReducers } from 'redux';

// import reducers
import list from './list';
import single from './single';
import populated from './populated';

const postReducer = combineReducers({
  list
  , single
  , populated 
});

export default postReducer;
