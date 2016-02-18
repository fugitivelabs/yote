import { combineReducers } from 'redux';

// import reducers
import CRUD from './crudReducers';
import customReducers from './customReducers';

const newsReducer = combineReducers({
  CRUD
  , customReducers
});

export default newsReducer;
