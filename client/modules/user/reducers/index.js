import { combineReducers } from 'redux';

// import reducers
import single from './userSingleReducers';
import list from './userListReducers';

const userReducer = combineReducers({
  single,
  list
});

export default userReducer;
