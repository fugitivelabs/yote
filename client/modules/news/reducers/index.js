import { combineReducers } from 'redux';
import { REQUEST_NEWS, RECEIVE_NEWS } from '../actions';

function list(state = {
  isFetching: false
  , items: []
  , pagination: {}
}, action) {
  switch (action.type) {
    case REQUEST_NEWS:
      console.log("REQUEST_NEWS")
      return Object.assign({}, state, {
        isFetching: true
      })
      break;
    case RECEIVE_NEWS:
      console.log("RECEIVE_NEWS");
      console.log(action);
      return Object.assign({}, state, {
        isFetching: false
        , items: action.list
      })
      break;

    default:
      return state
  }
}

const newsReducer = combineReducers({
  list
});

export default newsReducer;
