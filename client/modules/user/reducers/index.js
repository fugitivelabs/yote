import { combineReducers } from 'redux';

// import reducers
import single from './userSingleReducers';

const userReducer = combineReducers({
  single
});

export default userReducer;
