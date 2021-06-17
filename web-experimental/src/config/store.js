import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../resources/counter/counterSlice';
import logger from 'redux-logger'

// info on integrating apiSlices into the store here: https://redux-toolkit.js.org/rtk-query/api/created-api/redux-integration
import { productService } from '../resources/product/productService';

// More info: https://redux-toolkit.js.org/usage/usage-guide
// redux thunk is included with getDefaultMiddleware. More info on that: https://redux-toolkit.js.org/api/getDefaultMiddleware

// TODO: Check out the new thunk syntax and apply it to Yote's action/reducer pattern https://redux-toolkit.js.org/api/createAsyncThunk

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [productService.reducerPath]: productService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(productService.middleware),

});
