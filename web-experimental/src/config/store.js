import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../resources/counter/counterSlice';
import authReducer from '../resources/user/authStore';
import productReducer from '../resources/product/productStore';
import logger from 'redux-logger';

// info on integrating apiSlices into the store here: https://redux-toolkit.js.org/rtk-query/api/created-api/redux-integration
import { productService } from '../resources/productRTK/productService';

// More info: https://redux-toolkit.js.org/usage/usage-guide
// redux thunk is included with getDefaultMiddleware. More info on that: https://redux-toolkit.js.org/api/getDefaultMiddleware

export const store = configureStore({
  reducer: {
    auth: authReducer
    , counter: counterReducer
    , product: productReducer
    , [productService.reducerPath]: productService.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(productService.middleware),

});
