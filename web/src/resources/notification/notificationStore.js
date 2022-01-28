import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiUtils from '../../global/utils/api';
import { convertListToMap, shouldFetch } from '../../global/utils/storeUtils';


// First define all API calls for notification
/**
 * The functions below, called thunks, allow us to perform async logic. They
 * can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
 * will call the thunk with the `dispatch` function as the first argument. Async
 * code can then be executed and other actions can be dispatched. Thunks are
 * typically used to make async requests.
 * 
 * In practice we won't dispatch these directly, they will be dispatched by notificationService which has a nicer api built on hooks.
 */

// READ
export const fetchSingleNotification = createAsyncThunk(
  'notification/fetchSingle'
  , async (id) => {
    const endpoint = `/api/notifications/${id}`;
    const response = await apiUtils.callAPI(endpoint);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const fetchNotificationList = createAsyncThunk(
  'notification/fetchList' // this is the action name that will show up in the console logger.
  , async (listArgs) => {
    const endpoint = `/api/notifications?${listArgs}`;
    const response = await apiUtils.callAPI(endpoint);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// UPDATE
export const sendUpdateNotification = createAsyncThunk(
  'notification/sendUpdate'
  , async ({_id, ...updates}) => {
    const endpoint = `/api/notifications/${_id}`;
    const response = await apiUtils.callAPI(endpoint, 'PUT', updates);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const sendDismissNotificationList = createAsyncThunk(
  'notification/sendDismissList'
  , async (ids) => {
    const endpoint = `/api/notifications/dismiss-list`;
    const response = await apiUtils.callAPI(endpoint, 'PUT', {notificationIds: ids});
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
)

// DELETE
export const sendDeleteNotification = createAsyncThunk(
  'notification/sendDelete'
  , async (id) => {
    const endpoint = `/api/notifications/${id}`;
    const response = await apiUtils.callAPI(endpoint, 'DELETE');
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// next define the store's initial state
const initialState = {
  /**
   * "byId" is an object map of all notification items in the store. The map's keys are
   * the Mongo ids of the objects by default. This is where all notification objects will live.
   */
  byId: {}
  
  /**
   * "queries" is an object map of all server fetches for notifications. The map's keys are listArgs
   * in the case of list fetches and Mongo ids in the case of single fetches.
   * Each individual query looks like this:
   * 
   * @example {
   *  expirationDate: date
   *  receivedAt: date
   *  status: 'pending' || 'fulfilled' || 'rejected'
   *  // for lists
   *  ids: [mongoId, mongoId]
   *  // for singles
   *  id: mongoId
   * }
   */
  , singleQueries: {}
  , listQueries: {}

};

// define the notificationSlice. This is a combination of actions and reducers. More info: https://redux-toolkit.js.org/api/createSlice
export const notificationSlice = createSlice({
  name: 'notification'
  , initialState
  /**
   * The `reducers` field lets us define reducers and generate associated actions.
   * Unlike the selectors defined at the bottom of this file, reducers only have access
   * to this specific reducer and not the entire store.
   * 
   * Again, we will not dispatch these directly, they will be dispatched by notificationService.
   */
  , reducers: {
    invalidateQuery: (state, action) => {
      const queryKey = action.payload;
      const query = state.listQueries[queryKey] || state.singleQueries[queryKey];
      if(query) query.didInvalidate = true
    }
    , addPushNotificationToStore: (state, action) => {
      const { queryKey, notification } = action.payload;
      // add the notification object to the byId map
      state.byId[notification._id] = notification;
      // add/update singleQuery
      state.singleQueries[notification._id] = {
        ...state.singleQueries[notification._id]
        , id: notification._id
        , status: 'fulfilled'
        , didInvalidate: false
        , error: null
      }
      // get the listQuery object
      const listQuery = state.listQueries[queryKey];
      if(listQuery) {
        // add the id at the beginning of the array
        listQuery.ids.unshift(notification._id)
      } else {
        console.log('Could not find list');
      }
    }
  }

  /**
   * The `extraReducers` field lets the slice handle actions defined elsewhere,
   * including actions generated by createAsyncThunk or in other slices.
   * We'll use them to track our server request status.
   * 
   * We'll add a case for each API call defined at the top of the file to dictate
   * what happens during each API call lifecycle.
   */
  , extraReducers: (builder) => {
    builder
      // READ
      .addCase(fetchSingleNotification.pending, (state, action) => {
        // update or create a query object for it in the queries map
        state.singleQueries[action.meta.arg] = { ...state.singleQueries[action.meta.arg], id: action.meta.arg, status: 'pending', didInvalidate: false, error: null };
      })
      .addCase(fetchSingleNotification.fulfilled, (state, action) => {
        const notification = action.payload;
        // add the notification object to the byId map
        state.byId[notification._id] = notification;
        // find the query object for this fetch in the singleQueries map and update query info
        const singleQuery = state.singleQueries[action.meta.arg];
        singleQuery.status = 'fulfilled';
        singleQuery.receivedAt = Date.now();
        singleQuery.expirationDate = Date.now() + (1000 * 60 * 5); // 5 minutes from now
      })
      .addCase(fetchSingleNotification.rejected, (state, action) => {
        // find the query object for this fetch in the singleQueries map and update query info
        const singleQuery = state.singleQueries[action.meta.arg];
        singleQuery.status = 'rejected';
        singleQuery.error = action.error.message;
        singleQuery.receivedAt = Date.now();
      })
      .addCase(fetchNotificationList.pending, (state, action) => {
        // update or create the query object for it in the listQueries map
        state.listQueries[action.meta.arg] = { ...state.listQueries[action.meta.arg], status: 'pending', didInvalidate: false, error: null };
      })
      .addCase(fetchNotificationList.fulfilled, (state, action) => {
        const { notifications, totalPages } = action.payload;
        // update list query
        // convert the array of objects to a map
        const notificationMap = convertListToMap(notifications, '_id');
        // add the notification objects to the byId map
        state.byId = { ...state.byId, ...notificationMap };
        // find the query object for this fetch in the listQueries map and update query info
        const listQuery = state.listQueries[action.meta.arg];
        // save the array of ids for the returned notifications
        listQuery.ids = notifications.map(notification => notification._id);
        // set the rest of the query info
        listQuery.totalPages = totalPages;
        listQuery.status = 'fulfilled';
        listQuery.receivedAt = Date.now();
        listQuery.expirationDate = Date.now() + (1000 * 60 * 5); // 5 minutes from now

        // while we're here we might as well add a single query for each of these since we know they're fresh
        notifications.forEach(notification => {
          // add a single query for the notification.
          const singleQuery = {
            id: notification._id
            , status: listQuery.status
            , receivedAt: listQuery.receivedAt
            , expirationDate: listQuery.expirationDate
          };
          state.singleQueries[notification._id] = singleQuery;
        });
      })
      .addCase(fetchNotificationList.rejected, (state, action) => {
        const listQuery = state.listQueries[action.meta.arg];
        listQuery.status = 'rejected';
        listQuery.error = action.error.message;
        listQuery.receivedAt = Date.now();
      })
      
      // UPDATE
      .addCase(sendDismissNotificationList.pending, (state, action) => {
        console.log('action.meta.arg', action.meta.arg);
        // action.meta.arg in this case is the array of notificationIds that was sent in the POST
        const notificationIds = action.meta.arg;
        console.log('notificationIds', notificationIds);
        // optimistic update the ones that are already in the map
        notificationIds.forEach(id => {
          state.byId[id] = { ...state.byId[id], unread: false };
        });
      })
      .addCase(sendDismissNotificationList.fulfilled, (state, action) => {
        // nothing to do here, we already updated the ones in the store when we sent the request and the server didn't throw any errors.
      })
      .addCase(sendDismissNotificationList.rejected, (state, action) => {
        console.log('sendDismissNotificationList rejected');
        // not much to do in this case, not a huge deal if some were unable to be marked as read
        // action.meta.arg in this case is the array of notificationIds that was sent in the POST
        // const { notificationIds } = action.meta.arg;
      })
      .addCase(sendUpdateNotification.pending, (state, action) => {
        // action.meta.arg in this case is the updated notification object that was sent in the POST
        const updatedNotification = action.meta.arg
        // get the notification id
        const id = updatedNotification._id;
        // access or create the query object in the map
        state.singleQueries[id] = { ...state.singleQueries[id], id: id, status: 'pending', error: null }

        // optimistic update the version that's in the map
        state.byId[id] = { ...state.byId[id], ...updatedNotification}
      })
      .addCase(sendUpdateNotification.fulfilled, (state, action) => {
        const notification = action.payload;
        // replace the previous version in the map with the new one from the server
        state.byId[notification._id] = notification;
        // update the query object
        const singleQuery = state.singleQueries[notification._id];
        singleQuery.status = 'fulfilled';
        singleQuery.receivedAt = Date.now();
        singleQuery.expirationDate = Date.now() + (1000 * 60 * 5); // 5 minutes from now
      })
      .addCase(sendUpdateNotification.rejected, (state, action) => {
        // action.meta.arg in this case is the updated notification object that was sent in the POST
        const notification = action.meta.arg;
        // update the query object
        const singleQuery = state.singleQueries[notification._id];
        singleQuery.status = 'rejected';
        singleQuery.error = action.error.message;
        singleQuery.receivedAt = Date.now();
      })
      .addCase(sendDeleteNotification.pending, (state, action) => {
        // action.meta.arg in this case is the notification id
        const id = action.meta.arg;
        // access or create the query object in the map
        state.singleQueries[id] = { ...state.singleQueries[id], id: id, status: 'pending', error: null }
      })
      .addCase(sendDeleteNotification.fulfilled, (state, action) => {
        const notificationId = action.meta.arg;
        Object.keys(state.listQueries).forEach(queryKey => {
          // filter the notification from the existing lists before we remove it from the store below (avoid reference errors)
          state.listQueries[queryKey].ids = state.listQueries[queryKey].ids?.filter(id => id !== notificationId);
          // invalidate existing lists
          state.listQueries[queryKey].didInvalidate = true;
        });
        // remove the query object
        delete state.singleQueries[notificationId];
        // remove it from the map
        delete state.byId[notificationId];
      })
      .addCase(sendDeleteNotification.rejected, (state, action) => {
        // find the query object for this fetch in the singleQueries map and update query info
        const singleQuery = state.singleQueries[action.meta.arg];
        singleQuery.status = 'rejected';
        singleQuery.error = action.error.message;
        singleQuery.receivedAt = Date.now();
      })
  }
});

// export the actions defined above
export const { invalidateQuery, addPushNotificationToStore } = notificationSlice.actions;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export const fetchListIfNeeded = (queryKey) => (dispatch, getState) => {
  const notificationQuery = getState().notification.listQueries[queryKey];
  if(shouldFetch(notificationQuery)) {
    // console.log('Fetching notification list', queryKey);
    dispatch(fetchNotificationList(queryKey));
  } else {
    // console.log('No need to fetch, fresh query in cache');
  }
};

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  const notificationQuery = getState().notification.singleQueries[id];
  if(shouldFetch(notificationQuery)) {
    // console.log('Fetching notification', id);
    dispatch(fetchSingleNotification(id));
  } else {
    // console.log('No need to fetch, fresh query in cache');
  }
}

/**
 * The functions below are called a selectors and allow us to select a value from
 * the store.
 * 
 * These are the replacement for the old mapStoreToProps functionality.
 * 
 * Selectors can also be defined inline where they're used instead of
 * in the slice file. For example: `useSelector((store) => store.notification.value)`
 * 
 * Because selectors take the whole store as their first argument, and our
 * stores are all structured the same way, we could define these at the global
 * level and pass in the store we want to access when we use them.
 * 
 * for example in notificationService:
 * 
 * const singleNotification = useSelector(store => selectSingleById(store.notification, notificationId))
 * 
 * But to minimize the risk of over-generalizing, we'll define a set in each store.
 */


/**
 * 
 * @param {object} notificationStore - supplied by useSelector hook in the notificationService file
 * @param {string} queryKey - the key used to access the query from the map
 * @returns an array of notification objects matching the query's `ids` array
 */
export const selectListItems = ({ notification: notificationStore }, queryKey) => {
  const listIds = notificationStore.listQueries[queryKey]?.ids;
  if(listIds) {
    return listIds.map(id => notificationStore.byId[id]);
  } else {
    return null;
  }
}

export const selectListPageCount = ({ notification: notificationStore }, listArgs) => {
  return notificationStore.listQueries[listArgs]?.totalPages;
}

export const selectSingleById = ({ notification: notificationStore }, id) => {
  return notificationStore.byId[id];
}

export const selectQuery = ({ notification: notificationStore }, queryKey) => {
  const notificationQuery = notificationStore.listQueries[queryKey] || notificationStore.singleQueries[queryKey];
  return notificationQuery || {};
}

export default notificationSlice.reducer;