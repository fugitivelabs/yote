import { combineReducers } from 'redux';

//individual reducers
import user from './modules/user/userReducer.js';
import post from './modules/post/reducers/postReducers.js';
import product from './modules/product/productReducer.js'


const appReducer = combineReducers({
  user
  , post
  , product
  // next reducer
})

const rootReducer = (state, action) => {

  if (action.type === 'RECEIVE_LOGOUT'){
    state = undefined
    console.log("clear store");
  }

  return appReducer(state, action)
}

export default rootReducer;
