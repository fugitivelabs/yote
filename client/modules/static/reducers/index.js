import { combineReducers } from 'redux';

// import reducers
import contact from './contactReducer';


const staticReducer = combineReducers({
  contact
});

export default staticReducer;
