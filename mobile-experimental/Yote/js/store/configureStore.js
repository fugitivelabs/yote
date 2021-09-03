
import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import promise from './promise'; 
import array from './array';
import analytics from './analytics'; 
import rootReducer from '../rootReducer';
import loggerMiddleware from './logger'; 
import { persistStore, persistReducer } from 'redux-persist'; 
import AsyncStorage from '@react-native-community/async-storage'; 

const persistConfig = {
  key: 'root'
  , storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, rootReducer); 

export default function configureStore() {
  let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware, promise, array, analytics, loggerMiddleware))
  let persistor = persistStore(store)

  window.store = store; 

  return { store, persistor }
}

module.exports = configureStore;

