import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import * as resourceReducers from './resourceReducers';

export const store = configureStore({
  reducer: {
    ...resourceReducers
  }
  , middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});