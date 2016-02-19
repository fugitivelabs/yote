import { combineReducers } from 'redux';

// import reducers
import list from './productListReducers';
import single from './productSingleReducers';
import populated from './productPopulatedReducers';

const postReducer = combineReducers({
  list
  , single
  , populated
});

export default postReducer;
