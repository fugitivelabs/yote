import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'

import counterReducer from '../resources/counter/counterSlice';
// import authReducer from '../resources/user/authStore';
import productReducer from '../resources/product/productStore';

import * as resourceReducers from './resourceReducers';

import logger from 'redux-logger';

import { 
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'; 
import AsyncStorage from '@react-native-community/async-storage'; 

// info on integrating apiSlices into the store here: https://redux-toolkit.js.org/rtk-query/api/created-api/redux-integration
import { productService } from '../resources/product/productService';

// More info: https://redux-toolkit.js.org/usage/usage-guide
// redux thunk is included with getDefaultMiddleware. More info on that: https://redux-toolkit.js.org/api/getDefaultMiddleware

// Mobile: 
// Needs to persist the store in case user kills the app - combine reducers is the only way to do this

// let rootReducer = combineReducers({
//   // auth: authReducer, 
//   counter: counterReducer,
//   product: productReducer,
//   [productService.reducerPath]: productService.reducer,
// });

let rootReducer = combineReducers(resourceReducers); 

let persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['wallet'] // reducers you don't want to persist (whitelist will do the opposite)
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function store() {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }).concat(logger),
  });

  let persistor = persistStore(store)
  window.store = store; 

  return { store, persistor }
}

module.exports = store;
