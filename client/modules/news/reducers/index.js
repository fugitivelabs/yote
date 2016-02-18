import { combineReducers } from 'redux';

// import reducers
// import { list, selected } from './crudReducers';
// import custom from './customReducers';
import list from './list';
import single from './single';
const newsReducer = combineReducers({
  list
  , single
});

export default newsReducer;
