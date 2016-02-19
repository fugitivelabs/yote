import { combineReducers } from 'redux';

// import reducers
import list from './list';
import single from './single';


const postReducer = combineReducers({
  list
  , single
});

export default postReducer;
