import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import * as resourceReducers from './resourceReducers';

export const initStore = (loggedInUser = null) => configureStore({
  reducer: {
    ...resourceReducers
  }
  , middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
  , preloadedState: {
    auth: {
      // set loggedInUser as preloaded state so the store is created before any auth checks occur.
      loggedInUser: loggedInUser && loggedInUser._id ? loggedInUser : null
      , status: "idle"
      , error: null
    }
  }
})